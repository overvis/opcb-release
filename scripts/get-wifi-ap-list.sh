#!/bin/bash
set -euo pipefail

# Get WiFi AP List on Raspbery Pi 3
# Use root permission !!!
#
# Argument's:
# ${1} - wifi device name (ex: 'wlan0')
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

# Set IFS to ensure grep output split only at line end on for statement
IFS='
'

# Scaning wifi AP
echo "Scan wifi AP on '$1' begin..."
wfReport=(`iw dev $1 scan | grep -o 'BSS ..\:..\:..:..\:..\:..\|SSID: .*\|signal\: .* \|freq\: .*'`)
printf "%s\n" "${wfReport[@]}"

echo "-----SCRIPT COMPLETE-----"

# Result:
# SSID|RSSI|BSSID
field_count=1
for field in ${wfReport[@]}; do

    IFS=$' \t'
    if [[ $field =~ "BSS" ]]; then
        bss_array=( $field )
        bssid=${bss_array[1]}
    fi
    if [[ $field =~ "freq:" ]]; then
        freq_array=( $field )
        freq=${freq_array[1]}
    fi
    if [[ $field =~ "signal:" ]]; then
        signal_array=( $field )
        rssi=${signal_array[1]}
    fi
    if [[ $field =~ "SSID" ]]; then
        ssid_array=( $field )
        unset ssid_array[0]
        ssid=${ssid_array[@]}
    fi

    if [[ $field_count -eq 4 ]]; then

        echo "\"${ssid}\"|${rssi}|${bssid}"

        bss_array=()
        bssid=''
        freq_array=()
        freq=''
        signal_array=()
        rssi=''
        ssid_array=()
        ssid=''

        field_count=0
    fi

    field_count=$((field_count+1))
done

exit 0
