#!/bin/bash

# Set Ethernet & WiFi interface parameters to the Raspbery Pi 3
# Use root permission !!!
#
# Target file - /etc/network/interfaces
# Target file - /etc/resolv.conf
#
# Argument's:
#
# --Ethernet--
# ${1}  - ethernet device name (ex: 'eth0')
# ${2}  - ethernet dhcp enabled ( 1 or 0)
# ${3}  - ethernet ip address and CIDR (ex: 192.168.1.23/24)
# ${4}  - ethernet gateway (ex: 192.168.1.1)
# ${5}  - ethernet dns1 server (ex: 8.8.8.8)
# ${6}  - ethernet dns2 server (ex: 1.1.1.1)
#

# Convert CIDR to network
function cidr_to_netmask() {
    value=$(( 0xffffffff ^ ((1 << (32 - $1)) - 1) ))
    echo "$(( (value >> 24) & 0xff )).$(( (value >> 16) & 0xff )).$(( (value >> 8) & 0xff )).$(( value & 0xff ))"
}

# Split 192.168.1.1/24 to 24
function cut_cidr() {
    IN=$1
    arrIN=(${IN//// })
    echo ${arrIN[1]}
}

# Split 192.168.1.1/24 to 192.168.1.1
function cut_ip() {
    IN=$1
    arrIN=(${IN//// })
    echo ${arrIN[0]}
}

# Write configuration file (must by use as full path file)
function write_conf() {
    file=$1
    data=$2
    # Check exist file
    if [ -f "${file}" ]; then
        # Copy file...
        cp -f "${file}" "${file}.bak"
        if [ $? != 0 ]; then
            echo "Error, cannot create backup file '${file}'."
            return 1
        fi
    else
        # Create new file
        > "${file}"
    fi

    # Write new configuration to the file
    echo -e ${data} >"${file}"
    if [ $? -ne 0 ]; then
        echo "Error, cannot write configuration to the '${file}'"
        cp -f "${file}.bak" "${file}"
        return 2
    fi

    # success
    return 0
}

# Check root permission
if [ "$(id -u)" != "0" ]; then
    echo "Error, this script must be run as root"
    exit 1
fi

# Check arguments
if [ $# -ge 6 ]; then
    :
else
    echo "Error, invalid arguments"
    exit 2
fi

# --Ethernet--
elan_netif=${1}
elan_dhcp_mode=${2}
elan_ip_cidr=${3}
elan_gateway=${4}
elan_dns1=${5}
elan_dns2=${6}

# ----------------------------------------------------------------------
# Target file - /etc/network/interfaces
#
content="\
# interfaces(5) file used by ifup(8) and ifdown(8)\n\
# Include files from /etc/network/interfaces.d:\n\
source /etc/network/interfaces.d/*\n\n"

content+="\
auto lo\n\
iface lo inet loopback\n\n"

# Ethernet interface config
if [ "${elan_netif}" != "" ]; then
    if [ ${elan_dhcp_mode} -eq 0 ]; then
        content+="# Static IP configuration for '${elan_netif}'\n"
        content+="auto ${elan_netif}\n"
        content+="iface ${elan_netif} inet static\n"
        content+="address $(cut_ip ${elan_ip_cidr})\n"
        content+="gateway ${elan_gateway}\n"
        content+="netmask $(cidr_to_netmask $(cut_cidr ${elan_ip_cidr}))\n\n"
    else
        content+="# Dinamic IP configuration for '${elan_netif}'\n"
        content+="auto ${elan_netif}\n"
        content+="iface ${elan_netif} inet dhcp\n\n"
    fi
fi

# Write new config
write_conf "/etc/network/interfaces" "${content}"
if [ $? -ne 0 ]; then
    exit $?
fi
#-----------------------------------------------------------------------

# ----------------------------------------------------------------------
# Target file - /etc/resolv.conf
#
content=""

# Ethernet interface config
if [ "${elan_netif}" != "" ]; then
    content+="nameserver ${elan_dns1}\n"
    content+="nameserver ${elan_dns2}\n"
fi

# Write new config
write_conf "/etc/resolv.conf" "${content}"
if [ $? -ne 0 ]; then
    exit $?
fi
#-----------------------------------------------------------------------

# Link Dwn/Up
if [ "${elan_netif}" != "" ]; then
    ip link set dev "${elan_netif}" down && ip link set dev "${elan_netif}" up
    sleep 1
fi

# Restart services
systemctl restart networking.service
sleep 1

exit 0
