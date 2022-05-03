#!/bin/bash
set -e

# Script workink directory
path=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

# Generate new private and public key
wg genkey > "${path}/private-key"
chmod 0600 "${path}/private-key"
wg pubkey < "${path}/private-key" > "${path}/publik-key"
