#!/bin/bash
# Get WiFi AP List on Raspbery Pi 3
# Use root permission !!!
#
# Argument's:
# ${1} - wifi device name (ex: 'wlan0')
#
# For translate error msg, use prefix 'Error, ...'

# Trim spaces on the string
function trim()
{
    local trimmed="${1}"

    # Strip leading spaces.
    while [[ ${trimmed} == ' '* ]]; do
       trimmed="${trimmed## }"
    done
    # Strip trailing spaces.
    while [[ ${trimmed} == *' ' ]]; do
        trimmed="${trimmed%% }"
    done

    echo "${trimmed}"
}

# parse result from 'iwlist scan'
function parse_result()
{
    while IFS= read -r line; do
        # test line contenst and parse as required
        [[ "$line" =~ Address ]] && {
            mac=$(trim ${line##*ess:})
        }
        [[ "$line" =~ Quality ]] && {
            qual=${line##*ity=}
            lvl=$(trim "${line##*evel=}")
        }
        [[ "$line" =~ ESSID ]] && {
            essid=${line##*ID:}
            echo "${essid}|${lvl}|${mac}"   # out
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
    # Scaning wifi ap station's
    iwlist ${1} scan | parse_result
    if [ $? -ne 1 ]; then
        echo "Error, cannot scan wifi AP station's."
        exit 2
    fi
    exit 0

else
    echo "Error, script invalid argument."
    exit 3
fi
