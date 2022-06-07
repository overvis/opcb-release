#!/bin/bash
# Get Core Temperature on Raspbery Pi 3
# Uses vcgencmd (which should be added to paths!)
#
# Argument's:
# none

# Trim spaces on the string
#function trim()
#{
#    local trimmed="${1}"
#
#    # Strip leading spaces.
#    while [[ ${trimmed} == ' '* ]]; do
#       trimmed="${trimmed## }"
#    done
#    # Strip trailing spaces.
#    while [[ ${trimmed} == *' ' ]]; do
#        trimmed="${trimmed%% }"
#    done
#
#    echo "${trimmed}"
#}

# parse result from 'vcgencmd measure_temp'
function parse_result()
{

    while IFS= read -r line; do
    # test line contents and parse as required
    [[ "$line" =~ temp ]] && {
        tempr=${line##*mp=}
        echo "${tempr}"   # out
    }
    
    done
}

# Check root permission
#if [ "$(id -u)" != "0" ]; then
#    echo "Error, this script must be run as root"
#    exit 1
#fi

# Check argument
#if [ $# -eq 1 ] && [ "${1}" != "" ]; then

    # Obtaining core temperature
    # vcgencmd measure_temp | parse_result
    echo "0"
    exit 0

#else
#    echo "Error, invalid argument"
#    exit 2
#fi
