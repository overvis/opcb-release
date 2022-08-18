#!/bin/bash

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
# For translate error msg, use prefix 'Error, ...'

# Check root permission
if [ "$(id -u)" != "0" ]; then
    echo "Error, this script must be run as root."
    exit 1
fi

if [ $# == 1 ]; then
    # Set new host name
    new_hostname=${1}
    old_hostname=$(cat /etc/hostname)

    if [ "${new_hostname}" != "${old_hostname}" ]; then
        if [ "${new_hostname}" != "" ] && [ "${old_hostname}" != "" ]; then
            sed -i "s/${old_hostname}/${new_hostname}/g" "/etc/hostname"
            sed -i "s/${old_hostname}/${new_hostname}/g" "/etc/hosts"
        else
            echo "${new_hostname} >/etc/hostname"
        fi
        hostname ${new_hostname}
    fi
fi

exit 0
