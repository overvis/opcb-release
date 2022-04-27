#!/bin/bash

# Set Ethernet & WiFi interface parameters to the Raspbery Pi 3
# Use root permission !!!
#
# Target file - /etc/dhcpcd.conf
# Target file - /etc/wpa_supplicant/wpa_supplicant.conf
# Target file - /etc/dnsmasq.conf
# Target file - /etc/hostapd/hostapd.conf
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
# --Wireles--
# ${7}  - wireles device name (ex: 'wlan0')
# ${8}  - wireles mode (0-disable, 1-station, 2-access point))
#
# wireles station (if wireles mode == 1)
    # ${9}  - wireles region by ISO 3166-1 (ex: 'PL')
    # ${10} - wireles sta ssid (ex: 'My sta Wifi')
    # ${11} - wireles sta password (ex: 'sta12345678')
    # ${12} - wireles sta dhcp mode (0-user manual, 1-automatic)
    # ${13} - wireles sta ip address and CIDR (ex: 192.168.1.24/24)
    # ${14} - wireles sta gateway (ex: 192.168.1.1)
    # ${15} - wireles sta dns1 server (ex: 8.8.8.8)
    # ${16} - wireles sta dns2 server (ex: 1.1.1.1)
#
# wireles access point (if wireles mode == 2)
    # ${9}  - wireles region by ISO 3166-1 (ex: 'PL')
    # ${10} - wireles ap ssid (ex: 'My ap Wifi')
    # ${11} - wireles ap password (ex: 'ap12345678')
    # ${12} - wireles ap ip address and CIDR (ex: 192.168.4.1/24)
    # ${13} - wireles ap dhcp ip addressing from (ex: 192.168.4.100)
    # ${14} - wireles ap dhcp ip addressing to (ex: 192.168.4.110)
#
# wireles disabled (if wireles mode == 0)
    # no argument's present

#
# For translate error msg, use prefix 'Error, ...'
#

# Convert CIDR to network
function cidr_to_netmask() {
    local value=$(( 0xffffffff ^ ((1 << (32 - $1)) - 1) ))
    echo "$(( (value >> 24) & 0xff )).$(( (value >> 16) & 0xff )).$(( (value >> 8) & 0xff )).$(( value & 0xff ))"
}

# Split 192.168.1.1/24 to 24
function cut_cidr() {
    local IN=$1
    local arrIN=(${IN//// })
    echo ${arrIN[1]}
}

# Split 192.168.1.1/24 to 192.168.1.1
function cut_ip() {
    local IN=$1
    local arrIN=(${IN//// })
    echo ${arrIN[0]}
}

# Write configuration file (must by use as full path file)
function write_conf() {
    local file=$1
    local data=$2
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
        echo "Error, cannot write configuration to the '${file}'."
        cp -f "${file}.bak" "${file}"
        return 2
    fi

    # success
    return 0
}

# Check root permission
if [ "$(id -u)" != "0" ]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Check arguments
if [ $# -ge 8 ]; then
    if [ ${8} -eq 0 ] && [ $# -eq 8 ]; then
        # Wi-fi is disabled
        :
    elif [ ${8} -eq 1 ] && [ $# -eq 16 ]; then
        # Wi-fi is station
        :
    elif [ ${8} -eq 2 ] && [ $# -eq 14 ]; then
        # Wi-fi is access point
        :
    else
        echo "Error, invalid arguments."
        exit 2
    fi
else
    echo "Error, invalid min required arguments."
    exit 2
fi

# --Ethernet--
elan_netif=${1}
elan_dhcp_mode=${2}
elan_ip_cidr=${3}
elan_gateway=${4}
elan_dns1=${5}
elan_dns2=${6}
# --Wireles--
wlan_netif=${7}
wlan_mode=${8}
wlan_region=${9}
# wireles station (if wireles mode == 1)
wlan_sta_ssid=${10}
wlan_sta_passw=${11}
wlan_sta_dhcp_mode=${12}
wlan_sta_ip_cidr=${13}
wlan_sta_gateway=${14}
wlan_sta_dns1=${15}
wlan_sta_dns2=${16}
# wireles access point (if wireles mode == 2)
wlan_ap_ssid=${10}
wlan_ap_passw=${11}
wlan_ap_ip_cidr=${12}
wlan_ap_dhcp_from=${13}
wlan_ap_dhcp_to=${14}
wlan_ap_dhcp_time="1h"

# ----------------------------------------------------------------------
# Target file - /etc/dhcpcd.conf
#
content="\
# Inform the DHCP server of our hostname for DDNS.\n\
hostname\n\n"
content+="\
# Persist interface configuration when dhcpcd exits.\n\
persistent\n\n"
content+="\
# Rapid commit support.\n\
# Safe to enable by default because it requires the equivalent option set\n\
# on the server to actually work.\n\
option rapid_commit\n\n"
content+="\
# A list of options to request from the DHCP server.\n\
option domain_name_servers, domain_name, domain_search, host_name\n\
option classless_static_routes\n\
# Respect the network MTU. This is applied to DHCP routes.\n\
option interface_mtu\n\n"
content+="\
# A ServerID is required by RFC2131.\n\
require dhcp_server_identifier\n\n"
content+="\
# Generate stable private IPv6 Addresses based from the DUID\n\
slaac private\n\n"

# Ethernet interface config
if [ "${elan_netif}" != "" ]; then
    if [ ${elan_dhcp_mode} -eq 0 ]; then
        content+="# Static IP configuration for '${elan_netif}'\n"
        content+="interface ${elan_netif}\n"
        content+="noipv6\n"
        content+="static ip_address=${elan_ip_cidr}\n"
        content+="static routers=${elan_gateway}\n"
        content+="static domain_name_servers=${elan_dns1} ${elan_dns2}\n\n"
    else
        content+="# Dinamic IP configuration for '${elan_netif}'\n\n"
    fi
fi

# Wi-Fi interface config
if [ "${wlan_netif}" != "" ]; then
    if [ ${wlan_mode} -eq 1 ]; then
        if [ ${wlan_sta_dhcp_mode} -eq 0 ]; then
            content+="# Static IP configuration for '${wlan_netif}'\n"
            content+="interface ${wlan_netif}\n"
            content+="noipv6\n"
            content+="static ip_address=${wlan_sta_ip_cidr}\n"
            content+="static routers=${wlan_sta_gateway}\n"
            content+="static domain_name_servers=${wlan_sta_dns1} ${wlan_sta_dns2}\n\n"
        else
            content+="# Dinamic IP configuration for '${wlan_netif}'\n\n"
        fi
    elif [ ${wlan_mode} -eq 2 ]; then
        content+="# Static IP configuration for '${wlan_netif}'\n"
        content+="interface ${wlan_netif}\n"
        content+="static ip_address=${wlan_ap_ip_cidr}\n"
        content+="nohook wpa_supplicant\n\n"
    fi
fi

# Write new config
write_conf "/etc/dhcpcd.conf" "${content}"
if [ $? -ne 0 ]; then
    exit $?
fi
#-----------------------------------------------------------------------

# ----------------------------------------------------------------------
# Target file - /etc/wpa_supplicant/wpa_supplicant.conf
#
content="country=${wlan_region}\n"
content+="ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n"
content+="ap_scan=1\n"
content+="update_config=1\n\n"

if [ "${wlan_sta_ssid}" != "" ] && [ ${wlan_mode} -eq 1 ]; then
    content+="# ${wlan_sta_ssid}\n"
    content+="network={\n"
    content+="\tssid=\"${wlan_sta_ssid}\"\n"
    content+="\tscan_ssid=1\n"
    # Check if password present
    if [ "${wlan_sta_passw}" != "" ]; then
        # Make psk
        passw_hash=$(wpa_passphrase "${wlan_sta_ssid}" "${wlan_sta_passw}" |grep -E "psk" |grep -v "#psk" |cut -d "=" -f 2)
        content+="\tkey_mgmt=WPA-PSK\n"
        content+="\tpsk=${passw_hash}\n"
    else
        content+="\tkey_mgmt=NONE\n"
        content+="\tpsk=\n"
    fi
    content+="}\n"
fi

# Write new config
write_conf "/etc/wpa_supplicant/wpa_supplicant.conf" "${content}"
if [ $? -ne 0 ]; then
    exit $?
fi
#-----------------------------------------------------------------------

# ----------------------------------------------------------------------
# Target file - /etc/dnsmasq.conf
#
if [ "${wlan_netif}" != "" ] && [ ${wlan_mode} -eq 2 ]; then
    wlan_ap_ip=$(cut_ip ${wlan_ap_ip_cidr})
    wlan_ap_mask=$(cidr_to_netmask $(cut_cidr ${wlan_ap_ip_cidr}))
    # Listening interface
    content="interface=${wlan_netif}\n"
    # Pool of IP addresses served via DHCP
    content+="dhcp-range=${wlan_ap_dhcp_from},${wlan_ap_dhcp_to},${wlan_ap_mask},${wlan_ap_dhcp_time}\n"
    # Local wireless DNS domain
    content+="domain=setup.overvis.com\n"
    # Alias for this router
    content+="address=/setup.overvis.com/${wlan_ap_ip}\n"

    # Write new config
    write_conf "/etc/dnsmasq.conf" "${content}"
    if [ $? -ne 0 ]; then
        exit $?
    fi
fi
# ----------------------------------------------------------------------

# ----------------------------------------------------------------------
# Target file - /etc/hostapd/hostapd.conf
#
if [ "${wlan_netif}" != "" ] && [ ${wlan_mode} -eq 2 ]; then
    content="country_code=${wlan_region}\n"
    content+="interface=${wlan_netif}\n"
    content+="ssid=${wlan_ap_ssid}\n"
    content+="hw_mode=g\n"
    content+="channel=7\n"
    content+="macaddr_acl=0\n"
    content+="auth_algs=1\n"
    content+="ignore_broadcast_ssid=0\n"
    content+="wpa=2\n"
    if [ "${wlan_ap_passw}" != "" ]; then
        # Make psk
        passw_hash=$(wpa_passphrase "${wlan_ap_ssid}" "${wlan_ap_passw}" |grep -E "psk" |grep -v "#psk" |cut -d "=" -f 2)
        content+="wpa_psk=${passw_hash}\n"
        content+="wpa_key_mgmt=WPA-PSK\n"
    else
        content+="wpa_psk=\n"
        content+="wpa_key_mgmt=NONE\n"
    fi
    content+="wpa_pairwise=TKIP\n"
    content+="rsn_pairwise=CCMP\n"

    # Write new config
    write_conf "/etc/hostapd/hostapd.conf" "${content}"
    if [ $? -ne 0 ]; then
        exit $?
    fi
fi
# ----------------------------------------------------------------------

# Services enable/disable
if [ ${wlan_mode} -eq 0 ]; then
    # Stop services if needed
    if (systemctl -q is-active hostapd.service) || (systemctl -q is-active dnsmasq.service); then
        systemctl stop hostapd.service dnsmasq.service
    fi

    # Disable services if needed
    if (systemctl -q is-enabled hostapd.service) || (systemctl -q is-enabled dnsmasq.service); then
        systemctl disable hostapd.service dnsmasq.service
    fi
    
    # Link Dwn
    rfkill block wifi
    sleep 1
    if [ "${wlan_netif}" != "" ]; then
        ip link set dev "${wlan_netif}" down
        sleep 1
    fi
    
elif [ ${wlan_mode} -eq 1 ]; then
    # Stop services if needed
    if (systemctl -q is-active hostapd.service) || (systemctl -q is-active dnsmasq.service); then
        systemctl stop hostapd.service dnsmasq.service
    fi

    # Disable services if needed
    if (systemctl -q is-enabled hostapd.service) || (systemctl -q is-enabled dnsmasq.service); then
        systemctl disable hostapd.service dnsmasq.service
    fi

    # Link Dwn/Up
    rfkill unblock wifi
    sleep 1
    if [ "${wlan_netif}" != "" ]; then
        ip link set dev "${wlan_netif}" down && ip link set dev "${wlan_netif}" up
        sleep 1
    fi
    
elif [ ${wlan_mode} -eq 2 ]; then
    # Enable services if needed
    if !(systemctl -q is-enabled hostapd.service) || !(systemctl -q is-enabled dnsmasq.service); then
        systemctl enable hostapd.service dnsmasq.service
    fi

    # Link Dwn/Up
    rfkill unblock wifi
    sleep 1
    if [ "${wlan_netif}" != "" ]; then
        ip link set dev "${wlan_netif}" down && ip link set dev "${wlan_netif}" up
        sleep 1
    fi

    # Restart services
    systemctl restart hostapd.service dnsmasq.service
    sleep 1
fi

# Link Dwn/Up
if [ "${elan_netif}" != "" ]; then
    ip link set dev "${elan_netif}" down && ip link set dev "${elan_netif}" up
    sleep 1
fi

# Restart services
systemctl restart dhcpcd.service wpa_supplicant.service networking.service
sleep 1

exit 0
