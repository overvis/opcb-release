#!/bin/bash
set -e

# Remember umask value
umask_org=$(umask -p)

# Generate new private and public key
umask 077
wg genkey > "wgcli-key"
wg pubkey < "wgcli-key" > "wgcli-key.pub"

# Restore umask
$umask_org
