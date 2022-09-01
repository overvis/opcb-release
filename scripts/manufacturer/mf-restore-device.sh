#!/bin/bash
set -euo pipefail

# Script for restore old device access on motherland
# API:
# curl https://motherland.overvis.com/api/device-ip/?deviceWgPublicKey=w0369XE5FvLk1yUk2e7ft9BVyxfvGwCsIS9DN7ci/Ro=
#
# curl http://10.42.0.1/api/device-info/
#
# Argument's:
# ${1} - deviceWgPrivateKey (Unique device private key)
# ${2} - macAddress (Unique device mac address)

# Function get json value by key name '$1 - json data', '$2 - json key name'
function getJsonValue()
{
    local jdata=$2
    local jkey=$1
    local jvalue=""

    # Check arguments
    if [[ $# -ne 2 ]] || [[ -z "$jdata" ]] || [[ -z "$jkey" ]]; then
        # !error
        echo "Error, invalid argument's!"
        return 1
    fi

    # Check json {...} and remove it
    if [[ "${jdata::1}" != "{" ]] || [[ "${jdata:(-1)}" != "}" ]]; then
        # !error
        echo "Error, is not json!"
        return 1
    fi
    jdata=${jdata:1:(-1)}
    
    # Remove new line symbol and extra spaces in 'jdata'
    IFS=
    jdata=$(echo $jdata | sed -e 's/\\n//g;
                                  s/ :/:/g; s/: /:/g; s/ : /:/g;
                                  s/" ,"/","/g; s/", "/","/g; s/" , "/","/g;
                                  s/","/"\n"/g')

    # Find 'jkey' in 'jdata'
    IFS=$'\n'
    for line in ${jdata[@]}; do

        if [[ $line == "\"$jkey\":"* ]]; then
            # Get value
            jvalue=${line##\"$jkey\":}
            if [[ "${jvalue::1}" == "\"" ]] && [[ "${jvalue:(-1)}" == "\"" ]]; then
                jvalue=${jvalue:1:(-1)}
            fi

            echo "$jvalue"
            return 0
        fi
    done

    # !error
    echo "Error, not found!"
    return 1
}



# >>> Main
echo ""
echo "Run script 'mf-restore-device'"
printf "  @ [ %s ]\n" "$@"

# Check argument's
if [[ $# != 2 ]] || [[ -z "$1" ]] || [[ -z "$2" ]]; then
    # !error
    echo "Error, invalid arguments!"
    exit 1
fi

# Check root permission
if [ "$(id -u)" != "0" ]; then
    echo "Error, this script must be run as root."
    exit 1
fi

# Variables
deviceWgPrivateKey=$1
deviceWgPublicKey=""
macAddress=$2

# 1. Generate Public key from private key
echo ""
echo "1. Generate public key..."
if [[ "${deviceWgPublicKey}" == "" ]]; then
    deviceWgPublicKey=$(wg pubkey <<<${deviceWgPrivateKey})
    if [[ $? -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
fi
echo "Public key [ ${deviceWgPublicKey} ] -- OK"

# 2. Get device IP address from the server
echo ""
echo "2. Get device IP address from the server [ motherland.overvis.com ]..."
response=$(
    curl --silent --fail --show-error --get --data-urlencode "deviceWgPublicKey=${deviceWgPublicKey}" https://motherland.overvis.com/api/device-ip/
)
if [ $? -ne 0 ]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Received response -- OK"

# 3. Parse response (JSON)
err_mask=0
echo ""
echo "3. Parse response from the server..."
#
motherlandWgPublicKey=$(getJsonValue "motherlandWgPublicKey" "$response")
((err_mask|=$?)) || true
echo "  @ motherlandWgPublicKey [ ${motherlandWgPublicKey} ]"
#
motherlandVpnIpAddress=$(getJsonValue "motherlandVpnIpAddress" "$response")
((err_mask|=$?)) || true
echo "  @ motherlandVpnIpAddress [ ${motherlandVpnIpAddress} ]"
#
vpnIpAddress=$(getJsonValue "vpnIpAddress" "$response")
((err_mask|=$?)) || true
echo "  @ vpnIpAddress [ ${vpnIpAddress} ]"
#
if [[ $err_mask -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Parse response -- OK"

# 4. Create Wireguard config file
echo ""
echo "4. Create Wireguard config file..."
wg_conf="
[Interface]
Address = ${vpnIpAddress}/16
PrivateKey = ${deviceWgPrivateKey}

[Peer]
PublicKey = ${motherlandWgPublicKey}
AllowedIPs = ${motherlandVpnIpAddress}/16
Endpoint = motherland.overvis.com:51820
PersistentKeepalive = 25"

umask 0077
echo "$wg_conf" >"/opt/opcb-release/wireguard/wg0.conf"
if [[ $? -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Created Wireguard config file -- OK"

# 5. Start Wireguard interface
echo ""
echo "5. Start Wireguard..."
ln -sf /opt/opcb-release/wireguard/wg0.conf /etc/wireguard/wg0.conf
systemctl restart wg-quick@wg0
systemctl enable wg-quick@wg0
echo "Wireguard started -- OK"

# 6. Check Wireguard interface connection
echo ""
echo "6. Check Wireguard connection..."
ping -c 1 ${motherlandVpnIpAddress}
if [[ $? -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Wireguard connected -- OK"

# 7. Get device info from the server
echo ""
echo "7. Get device info from the server [ ${motherlandVpnIpAddress} ]..."
response=$(
    curl --silent --fail --show-error http://${motherlandVpnIpAddress}/api/device-info/
)
if [ $? -ne 0 ]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Received response -- OK"

# 8. Parse response (JSON)
err_mask=0
err_mac=0
echo ""
echo "8. Parse response from the server..."
#
motherlandSshPublicKey=$(getJsonValue "motherlandSshPublicKey" "$response") || ((err_mask|=$?))
echo "  @ motherlandSshPublicKey [ ${motherlandSshPublicKey} ]"
#
pinCode=$(getJsonValue "pinCode" "$response") || ((err_mask|=$?))
echo "  @ pinCode [ ${pinCode} ]"
#
internalModelName=$(getJsonValue "internalModelName" "$response") || ((err_mask|=$?))
echo "  @ internalModelName [ ${internalModelName} ]"
#
internalSolutionName=$(getJsonValue "internalSolutionName" "$response") || ((err_mask|=$?))
echo "  @ internalSolutionName [ ${internalSolutionName} ]"
#
manufacturerName=$(getJsonValue "manufacturerName" "$response") || ((err_mask|=$?))
echo "  @ manufacturerName [ ${manufacturerName} ]"
#
labelName=$(getJsonValue "labelName" "$response") || ((err_mask|=$?))
echo "  @ labelName [ ${labelName} ]"
#
# TODO: after add MAC to API? romove err_mac and change to normal work
bindMacAddress=$(getJsonValue "macAddress" "$response") || ((err_mac|=$?))
echo "  @ macAddress [ ${bindMacAddress} ]"
#
if [[ $err_mask -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Parse response -- OK"

# 9. Save MAC to the file
echo ""
echo "9. Save MAC to the 'dev-bind-mac' file."
if [[ $err_mac -eq 0 ]] && [[ $bindMacAddress != $macAddress ]]; then
    $macAddress = $bindMacAddress
    umask 0077
    echo "${macAddress}" >"configs/dev-bind-mac"
    echo "Save new MAC -- OK"
else
    echo "Skipped."
fi

# 10. Add authorized key
echo ""
echo "10. Add 'motherlandSshPublicKey' to 'authorized_keys' list..."
umask 0077
mkdir -p "/root/.ssh"; grep -q -F "${motherlandSshPublicKey}" "/root/.ssh/authorized_keys" 2>/dev/null || echo "${motherlandSshPublicKey}" >>"/root/.ssh/authorized_keys"
echo "Server key added -- OK"

# 11. Generate image Label
echo ""
echo "11. Generate device image..."
umask 0022
bash /opt/opcb-release/scripts/manufacturer/mf-gen-label.sh "${deviceWgPrivateKey}" "${labelName}" "${macAddress}" "${pinCode}" "/opt/opcb-release/ui-static/opcb-label.png"
if [[ $? -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Device info image created -- OK"

# 12. Save pin code to the file
echo ""
echo "12. Save pin code to the 'dev-pin-code' file..."
umask 0077
echo "${pinCode}" >"/opt/opcb-release/wireguard/dev-pin-code"
echo "Pin code saved -- OK"

# Success
echo "-----SCRIPT COMPLETE-----"
exit 0