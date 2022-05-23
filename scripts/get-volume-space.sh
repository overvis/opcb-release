#!/bin/bash
# Get System Volume Space on Raspberry Pi 3
# Uses df
#
# Argument's:
# none

# Trim spaces on the string
#function trim()
# {
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

# parse result from 'df -h /'
function parse_result()
{

    while IFS= read -r line; do
    # test line contenst and parse as required
    [[ "$line" =~ "/" ]] && {
        echo "${line}"   # out
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

    # Obtaining volume space
    df -h / | parse_result
    exit 0

#else
#    echo "Error, invalid argument"
#    exit 2
#fi
