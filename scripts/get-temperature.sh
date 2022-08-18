#!/bin/bash

# Get Core Temperature on Raspbery Pi3 / OrangePi / BananaPi
#
# For translate error msg, use prefix 'Error, ...'
#
# Argument's:
# none
#
# Result:
# In millidegre * 10 (ex:6065 mC*10)

# Obtaining core temperature
sign=""
tempr="0"
file="/sys/class/thermal/thermal_zone0/temp";
if [ -f "${file}" ]; then
    # +60606
    tempr=$(cat "${file}")
    # check sign
    if [ "${tempr::1}" == "-" ] || [ "${tempr::1}" == "+" ]; then
        sign=${tempr::1}
        tempr=${tempr:1}
    fi
    tempr=$(($tempr/10))
fi
echo "${sign}${tempr}"
exit 0

