#!/bin/bash
set -euo pipefail

# Set hostname parameters to the Raspbery Pi 3
# Use root permission !!!
#
# Target file - /etc/hostname
# Target file - /etc/hosts
#
# Argument's:
#
# ${1} - host name (ex: 'RaspberryPi')
#

# Check argument
if [[ $# -ne 1 ]] || [[ "$1" == "" ]]; then
    echo "Error, invalid or not arguments ($@)."
    exit 1
fi

# Check root permission
if [[ "$(id -u)" != "0" ]]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Set new host name
new_hostname=$1
old_hostname=$(cat /etc/hostname)

if [[ "${new_hostname}" != "${old_hostname}" ]]; then
    
    if [[ "${old_hostname}" != "" ]]; then
        sed -i "s/${old_hostname}/${new_hostname}/g" "/etc/hostname"
        sed -i "s/${old_hostname}/${new_hostname}/g" "/etc/hosts"
    else
        echo "${new_hostname}" | tee "/etc/hostname"
        echo "127.0.0.1       ${new_hostname}" | tee --append "/etc/hosts"
    fi
    hostname ${new_hostname}
else
    echo "New hostname is already!"
fi

echo "-----SCRIPT COMPLETE-----"

exit 0
