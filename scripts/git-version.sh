#!/bin/bash
# Get git repository version
#
# Argument's:
# ${1} - path to the git directory
#

if [ $# -eq 1 ]; then
    # Go to the path
    cd ${1}
fi

# Check is git directory
if (git tag > /dev/null 2>&1); then
    version_var=$(git describe --always --dirty=-modified --tags)
    date_var=$(git show -s --format=%cs HEAD)
    echo "${version_var} (${date_var})"
else
    echo "unknowb/0.0.0 (No git directory)"
fi
exit 0
