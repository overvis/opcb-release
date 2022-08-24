#!/bin/bash
set -euo pipefail

# Get external cmd files presence from the control devices (USB flash)
# Use root permission !!!
#
# Checked files   - /mnt/sd?
# Checked devices - /dev/sd?
#
#
# Argument's:
# none
#
# Result:
# list of found files out of possible OVERVIS_DEACTIVATE, WIFI_AP
#

# Bind device
function bind_device() {
    local dev_name=${1}
    
    echo "Creating mount point /mnt/${dev_name}..."
    mkdir --parents "/mnt/${dev_name}"
    echo "Mounting ${dev_name}..."
    mount --no-mtab --read-only "/dev/${dev_name}" "/mnt/${dev_name}" || true
    return 0;
}

# Unbind device
function unbind_device() {
    local mp_name=${1}
    
    echo "Unmounting ${mp_name}..."
    umount --no-mtab "/dev/${mp_name}" || true
    echo "Removing mount point /mnt/${mp_name}..."
    rmdir "/mnt/${mp_name}" || true

    return 0;
}

# Check mount point
function check_mp() {
    local file_list=$(ls "/mnt/$1")
    local excmd_list=("OVERRIDE_CONF" "RESET_CONF" "UNBIND_ACCOUNT" "WIFI_AP")
    for file in ${file_list[@]}
    do
        for excmd in ${excmd_list[@]}
        do
            if [[ "${file^^}" == "${excmd}" ]]; then
                echo "$excmd"
            fi
        done
    done

    return 0;
}

# Check root permission
if [[ "$(id -u)" != "0" ]]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Check new devices
list_dev=$(ls /dev | grep sd) || true
list_mp=$(ls /mnt | grep sd) || true
for dev in ${list_dev[@]}; do
    for mp in ${list_mp[@]}; do
        if [[ "$dev" == "$mp" ]]; then
            # Device already exist, not bind it
            dev=""
            break
        fi
    done
    # Bind new device 
    if [[ "$dev" != "" ]]; then
        bind_device "$dev"
        list_mp=$(ls /mnt | grep sd) || true
    fi
done

# Check old devices
declare -a excmd_array=()
for mp in ${list_mp[@]}; do
    for dev in ${list_dev[@]}; do
        if [[ "$mp" == "$dev" ]]; then
            # Device binded, get excmd list
            excmd_array+=( $(check_mp "$mp") )
            mp=""
            break
        fi
    done
    # Unbind device if already removed
    if [[ "$mp" != "" ]]; then
        unbind_device "$mp"
    fi
done

echo "-----SCRIPT COMPLETE-----"

echo "$(echo "${excmd_array[@]}" | sed 's/ /|/g')"
exit 0
