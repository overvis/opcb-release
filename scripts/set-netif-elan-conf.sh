#!/bin/bash
set -euo pipefail

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

# Check arguments
if [[ $# -ne 6 ]] || [[ "$1" == "" ]]; then
    echo "Error, invalid or not arguments ($@)."
    exit 1
fi

# Check root permission
if [[ "$(id -u)" != "0" ]]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Check 'NetworkManager' service
if !(systemctl -q is-enabled NetworkManager.service) || !(systemctl -q is-active NetworkManager.service); then
    echo "Error, NetworkManager is not work!"
    exit 1
fi

# --Ethernet--
con_name="OPCB-ETHERNET"
netif=${1}
dhcp_mode=${2}
ip_cidr=${3}
gateway=${4}
dns1=${5}
dns2=${6}

# If connection not exist, then we create it
if !(nmcli -t connection show "$con_name" >/dev/null 2>&1); then
    echo "Connection ${con_name} not exist, create it..."
    nmcli connection add con-name "$con_name" ifname "$netif" type ethernet
    if [[ $? -ne 0 ]]; then
        # !error
        echo "Error, cannot create ${con_name} ethernet connection!"
        exit 1
    fi
fi

# Modify parameters
echo "Modify parameters in ${con_name}..."
if [[ $dhcp_mode -eq 0 ]]; then
    # IP manual
    nmcli connection modify "$con_name" ipv4.method "manual" ipv4.addresses "$ip_cidr" ipv4.gateway "$gateway" ipv4.dns "$dns1 $dns2"
else
    # IP DHCP
    nmcli connection modify "$con_name" ipv4.method "auto" ipv4.addresses "" ipv4.gateway "" ipv4.dns ""
fi
nmcli connection modify "$con_name" connection.interface-name "$netif" ipv6.method "ignore" connection.autoconnect TRUE

# Reload config files
echo "Reload configuration files..."
nmcli connection reload

# Reconnect
echo "Connect ${con_name}..."
status=$(nmcli -t device status | grep "^${netif}")
if [[ "$status" =~ ":connected" ]]; then
    echo "Device ${netif} already connected, disconnect it..."
    nmcli device disconnect "$netif" || true
    sleep 1
    echo "Reconnect ${con_name}..."
fi
nmcli --wait 10 connection up "$con_name"
nmcli device set "$netif" autoconnect yes managed yes

# Just in case, restart wireguard interface
echo "Restart Wireguard VPN interface..."
if [[ -f "/etc/wireguard/wg0.conf" ]]; then
    if !(ping -c 1 -w 1 -I "wg0" "10.42.0.1" >/dev/null 2>&1); then
        systemctl restart wg-quick@wg0.service
        echo "Restart Wireguard - OK"
    else
        echo "Skipped, wg0 ping success!"
    fi
else
    echo "Skipped, config file empty or not exist!"
fi

echo "-----SCRIPT COMPLETE-----"

exit 0
