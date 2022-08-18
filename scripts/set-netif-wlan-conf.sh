#!/bin/bash

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
#
#
# For translate error msg, use prefix 'Error, ...'
#

# Write wifi ap configuration
function write_wifi_ap_conf() {
    local con_name="OPCB-WIFI"
    local netif=${1}
    local region=${2}
    local ssid=${3}
    local passw=${4}
    local ip_cidr=${5}
    local timeout=30

    # enable wifi
    if [ "$(nmcli -t radio wifi)" != "enabled" ]; then
        nmcli -w ${timeout} radio wifi on
    fi

    # change region
    if [ -f "/etc/default/crda" ]; then
        sed -i "s/REGDOMAIN=.*/REGDOMAIN=${region}/g" "/etc/default/crda"    
    fi
    iw reg set "$region"

    # interface down
    nmcli -w ${timeout} connection down "$con_name"

    # delete config
    nmcli connection delete "$con_name"

    # create config
    nmcli connection add con-name "$con_name" ifname $netif type wifi mode ap ssid "$ssid"
    if [ $? -ne 0 ]; then
        # error
        return -1
    fi

    # modify params
    if [ "$passw" != "" ]; then
        nmcli connection modify "$con_name" 802-11-wireless.band bg 802-11-wireless.channel 7 802-11-wireless-security.key-mgmt "wpa-psk" 802-11-wireless-security.psk "$passw"
    else
        nmcli connection modify "$con_name" 802-11-wireless.band bg 802-11-wireless.channel 7 802-11-wireless-security.key-mgmt "none" 802-11-wireless-security.psk "$passw"
    fi
    nmcli connection modify "$con_name" ipv4.method "shared" ipv4.addr "$ip_cidr" ipv6.method "ignore" connection.autoconnect "yes"

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

# Write wifi client configuration
function write_wifi_cli_conf() {
    local con_name="OPCB-WIFI"
    local netif=${1}
    local region=${2}
    local ssid=${3}
    local passw=${4}
    local dhcp_mode=${5}
    local ip_cidr=${6}
    local gateway=${7}
    local dns1=${8}
    local dns2=${9}
    local timeout=30

    # enable wifi
    if [ "$(nmcli -t radio wifi)" != "enabled" ]; then
        nmcli -w ${timeout} radio wifi on
    fi

    # change region
    if [ -f "/etc/default/crda" ]; then
        sed -i "s/REGDOMAIN=.*/REGDOMAIN=${region}/g" "/etc/default/crda"    
    fi
    iw reg set "$region"

    # interface down
    nmcli -w ${timeout} connection down "$con_name"

    # delete config
    nmcli connection delete "$con_name"

    # create config
    nmcli connection add con-name "$con_name" ifname $netif type wifi ssid "$ssid"
    if [ $? -ne 0 ]; then
        # error
        return -1
    fi

    # modify params
    if [ "$passw" != "" ]; then
        nmcli connection modify "$con_name" 802-11-wireless-security.key-mgmt "wpa-psk" 802-11-wireless-security.psk "$passw"
    else
        nmcli connection modify "$con_name" 802-11-wireless-security.key-mgmt "none" 802-11-wireless-security.psk "$passw"
    fi
    if [ $dhcp_mode -eq 0 ]; then
        nmcli connection modify "$con_name" ipv4.method "manual" ipv4.addr "$ip_cidr" ipv4.gateway $gateway ipv4.dns "$dns1 $dns2"
    else
        nmcli connection modify "$con_name" ipv4.method auto
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

# Write wifi ap configuration
function write_wifi_off_conf() {
    local con_name="OPCB-WIFI"
    local timeout=30

    # interface down
    nmcli -w ${timeout} connection down "$con_name"

    # delete config
    nmcli connection delete "$con_name"

    # disable wifi
    if [ "$(nmcli -t radio wifi)" != "disabled" ]; then
        nmcli -w ${timeout} radio wifi off
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
if [ $# -ge 2 ] && [ "$1" != "" ]; then

    wlan_netif=${1}
    wlan_mode=${2}

    if [ $wlan_mode -eq 0 ]; then
        # Wi-fi disabled
        write_wifi_off_conf
        if [ $? -ne 0 ]; then
            echo "Error, disable wifi!"
            exit 1
        fi
    
    elif [ $wlan_mode -eq 1 ] && [ $# -eq 10 ]; then
        # Wi-fi is station
        wlan_region=${3}
        wlan_sta_ssid=${4}
        wlan_sta_passw=${5}
        wlan_sta_dhcp_mode=${6}
        wlan_sta_ip_cidr=${7}
        wlan_sta_gateway=${8}
        wlan_sta_dns1=${9}
        wlan_sta_dns2=${10}
        #
        write_wifi_cli_conf $wlan_netif $wlan_region "$wlan_sta_ssid" "$wlan_sta_passw" $wlan_sta_dhcp_mode $wlan_sta_ip_cidr $wlan_sta_gateway $wlan_sta_dns1 $wlan_sta_dns2
        if [ $? -ne 0 ]; then
            echo "Error, write wifi cli configuration!"
            exit 1
        fi

    elif [ $wlan_mode -eq 2 ] && [ $# -eq 6 ]; then
        # wireles access point
        wlan_region=${3}
        wlan_ap_ssid=${4}
        wlan_ap_passw=${5}
        wlan_ap_ip_cidr=${6}
        #
        write_wifi_ap_conf $wlan_netif $wlan_region "$wlan_ap_ssid" "$wlan_ap_passw" $wlan_ap_ip_cidr
        if [ $? -ne 0 ]; then
            echo "Error, write wifi ap configuration!"
            exit 1
        fi
    else
        echo "Error, invalid  wifi arguments."
        exit 1
    fi

else
    echo "Error, invalid min required arguments."
    exit 1
fi

# success
exit 0
