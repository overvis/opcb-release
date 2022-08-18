#!/bin/bash

# Get WiFi AP List on Raspbery Pi 3
# Use root permission !!!
#
# For translate error msg, use prefix 'Error, ...'
#
# Argument's:
# ${1} - wifi device name (ex: 'wlan0')
#

# parse result from 'iw wlan0 scan'
function parse_result()
{
    while IFS= read -r line; do
        # test line contenst and parse as required
        [[ "$line" == BSS* ]] && {
            mac=${line##*BSS }
            mac=${mac%%(*}
        }
        [[ "$line" =~ signal: ]] && {
            lvl=${line##*signal: }
        }
        [[ "$line" =~ SSID: ]] && {
            ssid=${line##*SSID: }
            echo "\"$ssid\"|$lvl|$mac"
        }
    done
}

# Check root permission
if [ "$(id -u)" != "0" ]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Check argument
if [ $# -eq 1 ] && [ "${1}" != "" ]; then
    # Scaning wifi AP
    iw ${1} scan | parse_result
    if [ $? -ne 1 ]; then
        echo "Error, cannot scan wifi AP!"
        exit 1
    fi
    exit 0
fi

echo "Error, script invalid argument."
exit 1
