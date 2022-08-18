#!/bin/bash

# Set Ethernet & WiFi interface parameters to the Raspbery Pi 3
# Use root permission !!!
#
# Target NetworkManager interface 'nmcli'
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
# For translate error msg, use prefix 'Error, ...'
#

# Write ethernet configuration
function write_ethernet_conf() {
    local con_name="OPCB-ETHERNET"
    local netif=${1}
    local dhcp_mode=${2}
    local ip_cidr=${3}
    local gateway=${4}
    local dns1=${5}
    local dns2=${6}
    local timeout=30

    # interface down
    nmcli -w ${timeout} connection down "$con_name"

    # delete config
    nmcli connection delete "$con_name"

    # create config
    nmcli connection add con-name "$con_name" ifname $netif type ethernet
    if [ $? -ne 0 ]; then
        # error
        return -1
    fi

    # modify params
    if [ $dhcp_mode -eq 0 ]; then
        # config manual
        nmcli connection modify "$con_name" ipv4.method "manual" ipv4.addresses "$ip_cidr" ipv4.gateway $gateway ipv4.dns "$dns1 $dns2"
    else
        nmcli connection modify "$con_name" ipv4.method "auto"
    fi
    nmcli connection modify "$con_name" ipv6.method "ignore" connection.autoconnect "yes"

    # interface up
    nmcli -w ${timeout} connection reload
    nmcli -w ${timeout} connection up "$con_name"
    if [ $? -ne 0 ]; then
        # error
        return -1
    fi

    # success
    return 0
}

# Check root permission
if [ "$(id -u)" != "0" ]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Check 'NetworkManager' service
if !(systemctl -q is-enabled NetworkManager.service); then
    systemctl enable NetworkManager
fi
if !(systemctl -q is-active NetworkManager.service); then
    systemctl start NetworkManager
fi

# Check arguments
if [ $# -ge 6 ] && [ "$1" != "" ]; then

    # --Ethernet--
    elan_netif=${1}
    elan_dhcp_mode=${2}
    elan_ip_cidr=${3}
    elan_gateway=${4}
    elan_dns1=${5}
    elan_dns2=${6}
    #
    write_ethernet_conf $elan_netif $elan_dhcp_mode $elan_ip_cidr $elan_gateway $elan_dns1 $elan_dns2
    if [ $? -ne 0 ]; then
        echo "Error, write ethernet configuration!"
        exit 1
    fi

else
    echo "Error, invalid min required arguments."
    exit 1
fi

# success
exit 0
