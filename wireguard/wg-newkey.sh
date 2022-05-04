#!/bin/bash
set -e


# Generate new private and public key
wg genkey > "private-key"
chmod 0600 "private-key"
wg pubkey < "private-key" > "publik-key"
