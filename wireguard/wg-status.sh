#!/bin/bash
set -euo pipefail

# Argument's:
#   none
#
# Result:
# LOCAL_KEY|LISTEN_PORT|PEER_KEY|ENDPOINT|ALLOWED_IPS|LATEST_HANDSHAKE|TRANSFER_RX|TRANSFER_TX|KEEPALIVE

# Convert ip address to the host name (use command 'host xxx.xxx.xxx.xxx')
function ip_to_host()
{
    local ip_addr=$1
    local host=$(host $ip_addr)

    if [[ $host == *"domain name pointer"* ]]; then
        # remove prefix '* domain name pointer' and sufix '.'
        echo $(sed -n 's/.$//; s/.* //gp' <<< "$host")
    else
        echo ""
    fi
}

# Check root permission
if [ "$(id -u)" != "0" ]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Variables
local_key="(none)"
listen_port="(none)"
peer_key="(none)"
endpoint="(none)"
allowed_ips="(none)"
latest_handshake="(none)"
transfer_rx="(none)"
transfer_rx="(none)"
keepalive="(none)"

# Check if WireGuard is installed
if [ -f "/usr/bin/wg" ]; then

    interface="wg0"
    dump=$(wg show ${interface} dump)
    info_array=($(sed -n 's/\t/\n/gp' <<< "$dump"))
    printf "%s\n" "${info_array[@]}"

    if [ ${#info_array[@]} -lt 4 ]; then
        # !error
        echo "Error, cannot receive dump info!"
        exit 1
    fi

    # ${info_array[0]}  - private-key
    # ${info_array[1]}  - public-key
    local_key=${info_array[1]}
    # ${info_array[2]}  - listen-port
    listen_port=${info_array[2]}
    # ${info_array[3]}  - fwmark

    if [ ${#info_array[@]} -eq 12 ]; then
        # ${info_array[4]}  - peer public-key
        peer_key=${info_array[4]}
        # ${info_array[5]}  - peer preshared-key
        # ${info_array[6]}  - peer endpoint [IP:PORT]
        endpoint=${info_array[6]}
        if [ "$endpoint" != "" ]; then
            ip=${endpoint%%:*}
            host=$(ip_to_host $ip)
            if [ "$host" != "" ]; then
                endpoint=$host;
            fi
        fi
        # ${info_array[7]}  - peer allowed-ips [IP/MASK]
        allowed_ips=${info_array[7]}
        # ${info_array[8]}  - peer latest-handshake [SEC]
        latest_handshake=${info_array[8]}
        # ${info_array[9]}  - peer transfer-rx [BYTE's]
        transfer_rx=${info_array[9]}
        # ${info_array[10]} - peer transfer-tx [BYTE's]
        transfer_tx=${info_array[10]}
        # ${info_array[11]} - peer persistent-keepalive [SEC]
        keepalive=${info_array[11]}
    fi
else
    echo "Error, wireguard not found!"
fi

echo "-----SCRIPT COMPLETE-----"

echo "${local_key}|${listen_port}|${peer_key}|${endpoint}|${allowed_ips}|${latest_handshake}|${transfer_rx}|${transfer_tx}|${keepalive}"
exit 0