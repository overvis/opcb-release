#!/bin/bash
# Get Core Voltage on Raspbery Pi 3
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

# parse result from 'vcgencmd measure_volts'
function parse_result()
{

    while IFS= read -r line; do
    # test line contenst and parse as required
    [[ "$line" =~ volt ]] && {
        volt=${line##*lt=}
        echo "${volt}"   # out
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

    # Obtaining core voltage
    vcgencmd measure_volts | parse_result
    exit 0

#else
#    echo "Error, invalid argument"
#    exit 2
#fi
