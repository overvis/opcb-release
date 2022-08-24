#!/bin/bash
set -euo pipefail

# Get git repository version
#
# result ex: opcb-221-rpi3/0.0.0|2022-06-16
#
# For translate error msg, use prefix 'Error, ...'
#
# Argument's:
# ${1} - path to the git directory
#

# Check argument
if [[ $# -ne 1 ]] || [[ "$1" == "" ]]; then
    echo "Error, invalid or not arguments ($@)."
    exit 1
fi

# Check is git directory
cd $1
if (git tag >/dev/null 2>&1); then
    version_var=$(git describe --always --dirty=-modified --tags)
    date_var=$(git show -s --format=%cs HEAD)
else
    version_var="unknown/0.0.0"
    date_var=""
fi

echo "-----SCRIPT COMPLETE-----"

echo "${version_var}|${date_var}"
exit 0
