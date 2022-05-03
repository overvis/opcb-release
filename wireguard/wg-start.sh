#!/bin/bash
set -e

# Configuration
CLIENT_IP="$(cat ip-addr)"
INTERFACE_IP="0.0.0.0"
INTERFACE_PORT="51820"
SERVER_KEY="w0369XE5FvLk1yUk2e7ft9BVyxfvGwCsIS9DN7ci/Ro="
SERVER_IP="10.0.0.1/32"

# Path to the working directory
path=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

# Down the wire guard interface
ip link set wg0 down
ip link del wg0
sleep 1

# Up the WireGuard interface
ip link add wg0 type wireguard
ip addr add "${CLIENT_IP}" dev wg0
wg set wg0 private-key "${path}/private-key"
ip link set wg0 up
sleep 1

# Add server peer
wg set wg0 peer "${SERVER_KEY}" allowed-ips "${SERVER_IP}" endpoint "${INTERFACE_IP}:${INTERFACE_PORT}"
