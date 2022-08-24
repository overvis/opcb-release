#!/bin/bash
set -euo pipefail

# Get System Memory Space on Raspberry Pi 3
#
# Argument's:
# none
#
# Result:
# In KiB (ex: TOTAL|USED|AVAILABLE)

# Obtaining memory space
mem=$(cat /proc/meminfo)
total=$(sed -n '/^MemTotal:/ s/[^0-9]//gp' <<< "${mem}")
free=$(sed -n '/^MemFree:/ s/[^0-9]//gp' <<< "${mem}")
available=$(sed -n '/^MemAvailable:/ s/[^0-9]//gp' <<< "${mem}")
used=$(($total - $free))

echo "-----SCRIPT COMPLETE-----"

# TOTAL|USED|AVAILABLE
echo "${total}|${used}|${available}"
exit 0