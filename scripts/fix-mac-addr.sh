#!/bin/bash
set -e

# This script generate new MAC adress for eth0 interface.
# Manufacturer bytes XX:XX:XX:00:00:00 generated base on wlan0 MAC.
# New MAC address saved to the file '/etc/network/eth0-bind-new-mac'
# and restore every time if eth0 is pre-up.

# Randomize MAC address
function randomMAC()
{
    if [ -f "/sys/class/net/wlan0/address" ]; then
        mac_hi=$(cat "/sys/class/net/wlan0/address" | cut -d: -f-3)
        mac_lo=$(openssl rand -hex 3 | sed 's/\(..\)/\1:/g; s/.$//')
        echo "${mac_hi}:${mac_lo}"
    else
        mac=$(openssl rand -hex 3 | sed 's/\(..\)/\1:/g; s/.$//')    
        echo "54:ef:33:$mac"
    fi
}

# Check if interface present
interface="eth0"
if [ -e "/sys/class/net/${interface}" ]; then

    mac=$(cat "/sys/class/net/${interface}/address")
    if [ "$mac" == "00:10:20:30:40:50" ]; then
        echo "${interface}: Detected invalid MAC address ${mac}"

        # Check if binding file present
        file="/etc/network/${interface}-bind-new-mac"
        if [ ! -f "$file" ] || [ "$(cat "$file")" == "" ]; then
            # Generate new MAC and write to bind file
            echo $(randomMAC) >"$file"
            mac=$(cat "$file")
            echo "${interface}: Get new MAC address ${mac}"
        else
            # Read MAC from bind file
            mac=$(cat "$file")
            echo "${interface}: Get restored MAC address ${mac}"
        fi

        # Interface is UP ?
        state=$(cat "/sys/class/net/${interface}/operstate")
        if [ "$state" == "up" ]; then
            ip link set $interface down
            echo "${interface}: Change MAC address to ${mac}"
            ip link set $interface address $mac
            ip link set $interface up

        # Interface is DOWN ?
        else
            echo "${interface}: Change MAC address to ${mac}"
            ip link set $interface address $mac
        fi
    fi
fi

exit 0
