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

echo "Enter to dir '$1'..."
cd $1

echo "Find tag..."
if (git tag >/dev/null 2>&1); then
    echo "Get version..."
    version_var=$(git describe --always --dirty=-modified --tags)
    echo "Get date..."
    date_var=$(git show -s --format=%cs HEAD)
else
    echo "Tag not found!"
    version_var="unknown/0.0.0"
    date_var=""
fi

echo "-----SCRIPT COMPLETE-----"

echo "${version_var}|${date_var}"
exit 0
