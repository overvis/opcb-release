#!/bin/bash
set -e

# Stop script if up wg0 interface
if [ "$IFACE" == "wg0" ]; then
    exit 0
fi

# Path to the working directory
path=$(dirname -- "$(readlink -f -- "$0")")
#path="/opt/opcb-release/wireguard"

# Configuration
CLIENT_LOCAL_IP=$(cat "${path}/ip-addr")
SERVER_PUB_KEY="w0369XE5FvLk1yUk2e7ft9BVyxfvGwCsIS9DN7ci/Ro="
SERVER_IP="staging2.overvis.com"   # IP or domain name
SERVER_PORT="57943"
SERVER_LOCAL_IP="10.42.0.1/32"

if [ "${path}" != "" ] && [ "${CLIENT_LOCAL_IP}" != "" ]; then

    # Down the wireguard interface if ehist
    if (ip link show wg0 1>/dev/null 2>/dev/null); then
        ip link set wg0 down
        ip link delete wg0
        sleep 1
    fi

    # Up the WireGuard interface
    ip link add wg0 type wireguard
    ip address add "${CLIENT_LOCAL_IP}" dev wg0
    wg set wg0 private-key "${path}/private-key"
    ip link set dev wg0 up

    # Add server peer
    wg set wg0 peer "${SERVER_PUB_KEY}" allowed-ips "${SERVER_LOCAL_IP}" endpoint "${SERVER_IP}:${SERVER_PORT}" persistent-keepalive 10

    echo "WireGuard configure complete."
    exit 0
fi

echo "ERROR, Please configure client IP address in 'ip-addr' file."
exit 1
