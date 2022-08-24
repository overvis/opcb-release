#!/bin/bash
set -euo pipefail

# Get System Volume Space on Raspberry Pi 3
# Uses df
#
# Argument's:
# none
#
# Result:
# In KiB (ex: TOTAL|USED|AVAILABLE)

# Obtaining volume space
# /dev/root      14988K 7613K  6672K  54% /
mem=$(df -BK / | sed -n '1d; s/ * / /gp')
array=($(sed -n 's/K//g; s/ /\n/gp' <<< "$mem"))

echo "-----SCRIPT COMPLETE-----"

# TOTAL|USED|AVAILABLE
echo "${array[1]}|${array[2]}|${array[3]}"
exit 0
