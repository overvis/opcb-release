#!/bin/bash
set -euo pipefail

# Set Ethernet & WiFi interface parameters to the Raspbery Pi 3
# Use root permission !!!
#
# Target NetworkManager interface 'nmcli'
#
# Argument's:
#
# --Wireles--
# ${1}  - wireles device name (ex: 'wlan0')
# ${2}  - wireles mode (0-disable, 1-station, 2-access point))
#
# wireles station (if wireles mode == 1)
    # ${3}  - wireles region by ISO 3166-1 (ex: 'PL')
    # ${4} - wireles sta ssid (ex: 'My sta Wifi')
    # ${5} - wireles sta password (ex: 'sta12345678')
    # ${6} - wireles sta dhcp mode (0-user manual, 1-automatic)
    # ${7} - wireles sta ip address and CIDR (ex: 192.168.1.24/24)
    # ${8} - wireles sta gateway (ex: 192.168.1.1)
    # ${9} - wireles sta dns1 server (ex: 8.8.8.8)
    # ${10} - wireles sta dns2 server (ex: 1.1.1.1)
#
# wireles access point (if wireles mode == 2)
    # ${3}  - wireles region by ISO 3166-1 (ex: 'PL')
    # ${4} - wireles ap ssid (ex: 'My ap Wifi')
    # ${5} - wireles ap password (ex: 'ap12345678')
    # ${6} - wireles ap ip address and CIDR (ex: 192.168.4.1/24)

# Check arguments
if [[ $# -lt 2 ]] || [[ "$1" == "" ]]; then
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

# --WI-FI GLOBAL--
con_name="OPCB-WIFI"
netif=${1}
mode=${2}

# Enable radio
if [[ "$(nmcli -t radio wifi)" != "enabled" ]]; then
    echo "Device '${netif}' radio is disabled, enable it..."
    nmcli radio wifi on
fi

# --WI-FI OFF--
if [[ $mode -eq 0 ]]; then

    # Disconnect device
    status=$(nmcli -t device status | grep "^${netif}")
    if [[ "$status" =~ ":connected" ]]; then
        echo "Device '${netif}' already connected, disconnected it..."
        nmcli device disconnect "$netif" || true
    fi

    # Complete SUCCESS

# --WI-FI STA--
elif [[ $mode -eq 1 ]] && [[ $# -eq 10 ]]; then
    region=${3}
    sta_ssid=${4}
    sta_passw=${5}
    sta_dhcp_mode=${6}
    sta_ip_cidr=${7}
    sta_gateway=${8}
    sta_dns1=${9}
    sta_dns2=${10}

    # SSID is empty then disable Wifi 
    if [[ "${sta_ssid}" == "" ]]; then
        echo "SSID is empty, then disable Wifi..."
        nmcli device disconnect "$netif" || true
    
    else
        # Change region
        echo "Change region to '${region}'..."
        if [[ -f "/etc/default/crda" ]]; then
            sed -i "s/REGDOMAIN=.*/REGDOMAIN=${region}/g" "/etc/default/crda"    
        fi
        iw reg set "$region"

        # If connection not exist, then we create it
        if !(nmcli -t connection show "$con_name" >/dev/null 2>&1); then
            echo "Connection ${con_name} not exist, create it..."
            nmcli connection add con-name "$con_name" ifname "$netif" type wifi ssid "$sta_ssid"
            if [[ $? -ne 0 ]]; then
                # !error
                echo "Error, cannot create ${con_name} wifi connection!"
                exit 1
            fi
        fi

        # Modify parameters
        echo "Modify parameters in ${con_name}..."
        nmcli connection modify "$con_name" connection.interface-name "$netif" connection.autoconnect TRUE
        nmcli connection modify "$con_name" 802-11-wireless.mode "infrastructure" 802-11-wireless.ssid "$sta_ssid" 802-11-wireless.band "" 802-11-wireless.channel ""
        if [ "$sta_passw" != "" ]; then
            nmcli connection modify "$con_name" 802-11-wireless-security.key-mgmt "wpa-psk" 802-11-wireless-security.psk "$sta_passw"
        else
            nmcli connection modify "$con_name" remove 802-11-wireless-security
        fi
        if [ $sta_dhcp_mode -eq 0 ]; then
            nmcli connection modify "$con_name" ipv4.method "manual" ipv4.addresses "$sta_ip_cidr" ipv4.gateway "$sta_gateway" ipv4.dns "$sta_dns1 $sta_dns2"
        else
            nmcli connection modify "$con_name" ipv4.method "auto" ipv4.addresses "" ipv4.gateway "" ipv4.dns ""
        fi
        nmcli connection modify "$con_name" ipv6.method "ignore"

        # Reload config files
        echo "Reload configuration files..."
        nmcli connection reload

        # Reconnect
        echo "Connect ${con_name}..."
        status=$(nmcli -t device status | grep "^${netif}")
        if [[ "$status" =~ ":connected" ]]; then
            echo "Device '${netif}' already connected, disconnected it..."
            nmcli device disconnect "$netif" || true
            sleep 1
            echo "Reconnect ${con_name}..."
        fi
        nmcli --wait 25 connection up "$con_name"
        nmcli device set "$netif" autoconnect yes managed yes
    fi

    # Complete SUCCESS

# --WI-FI AP--
elif [[ $mode -eq 2 ]] && [[ $# -eq 6 ]]; then
    region=${3}
    ap_ssid=${4}
    ap_passw=${5}
    ap_ip_cidr=${6}

    if [[ "$ap_ssid" == "" ]]; then
        echo "SSID is empty, then disable Wifi..."
        nmcli device disconnect "$netif" || true

    else
        # Change region
        echo "Change region to ${region}..."
        if [[ -f "/etc/default/crda" ]]; then
            sed -i "s/REGDOMAIN=.*/REGDOMAIN=${region}/g" "/etc/default/crda"    
        fi
        iw reg set "$region"

        # If connection not exist, then we create it
        if !(nmcli -t connection show "$con_name" >/dev/null 2>&1); then
            echo "Connection ${con_name} not exist, create it..."
            nmcli connection add con-name "$con_name" ifname "$netif" type wifi ssid "$ap_ssid"
            if [[ $? -ne 0 ]]; then
                # !error
                echo "Error, cannot create ${con_name} wifi connection!"
                exit 1
            fi
        fi

        # Modify parameters
        echo "Modify parameters in ${con_name}..."
        nmcli connection modify "$con_name" connection.interface-name "$netif" connection.autoconnect TRUE
        nmcli connection modify "$con_name" 802-11-wireless.ssid "$ap_ssid" 802-11-wireless.hidden no 802-11-wireless.mode "ap" 802-11-wireless.band "bg" 802-11-wireless.channel 7
        if [ "$ap_passw" != "" ]; then
            nmcli connection modify "$con_name" 802-11-wireless-security.key-mgmt "wpa-psk" 802-11-wireless-security.psk "$ap_passw"
        else
            nmcli connection modify "$con_name" remove 802-11-wireless-security
        fi
        nmcli connection modify "$con_name" ipv4.method "shared" ipv4.addr "$ap_ip_cidr" ipv4.gateway "" ipv4.dns "" ipv6.method "ignore"
        
        # Reload config files
        echo "Reload configuration files..."
        nmcli connection reload

        # Reconnect
        echo "Connect ${con_name}..."
        status=$(nmcli -t device status | grep "^${netif}")
        if [[ "$status" =~ ":connected" ]]; then
            echo "Device '${netif}' already connected, disconnected it..."
            nmcli device disconnect "$netif" || true
            sleep 1
            echo "Reconnect ${con_name}..."
        fi
        nmcli --wait 15 connection up "$con_name"
        nmcli device set "$netif" autoconnect yes managed yes
    fi

    # Complete SUCCESS
fi

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
