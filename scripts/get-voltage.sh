#!/bin/bash
set -euo pipefail

# Get Core Voltage on Raspbery Pi 3
# Uses vcgencmd (which should be added to paths!)
#
# For translate error msg, use prefix 'Error, ...'
#
# Argument's:
# none
#
# Result:
# In millivolts (ex: 1262)

# Obtaining core voltage
volt="0"
file="/usr/bin/vcgencmd";
if [[ -f "${file}" ]]; then
    # volt=1.2625V
    volt=$(${file} measure_volts)
    # volt=1.2625V => 1.2625V
    volt=${volt##*=}
    # 1.2625V => 1.2625
    volt=${volt%V}
    # 1.2625 => 12625
    volt=${volt/./}
    if [[ ${#volt} -ge 4 ]]; then
        # 12625 => 1262
        volt=${volt::4}
    fi
fi
echo ${volt}
exit 0
