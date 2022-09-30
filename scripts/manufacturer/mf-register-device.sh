#!/bin/bash
set -euo pipefail

# Script for register new device on motherland
# API:
# curl -H "Content-Type: application/json" \
#   -d '{
#     "licenseId": "92bad890-9df4-4194-94a8-82fbc7c30dd9",
#     "licensePassword": "somepass",
#     "deviceWgPublicKey": "w0369XE5FvLk1yUk2e7ft9BVyxfvGwCsIS9DN7ci/Ro=",
#     "macAddress": "01:02:03:04:05:06",
#     "description": "Batch description."
#     "passwords": []
#   }' https://motherland.overvis.com/api/register-vpn-device/
#
# Argument's:
# ${1} - licenseId (License UUID)
# ${2} - licensePassword (License password)
# ${3} - deviceWgPrivateKey (Unique device private key)
# ${4} - macAddress (Unique device mac address)
# ${5} - description (Description)

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
echo "Run script 'mf-register-device'"
printf "  @ [ %s ]\n" "$@"

# Check argument's
if [[ $# != 5 ]] || [[ -z "$1" ]] || [[ -z "$2" ]] || [[ -z "$3" ]] || [[ -z "$4" ]] || [[ -z "$5" ]]; then
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
licenseId=$1
licensePassword=$2
deviceWgPrivateKey=$3
deviceWgPublicKey=""
macAddress=$4
description=$5

# 1. Generate Public key from private key
echo ""
echo "1. Generate public key..."
if [[ "${deviceWgPublicKey}" == "" ]]; then
    deviceWgPublicKey=$(wg pubkey <<<${deviceWgPrivateKey})
    if [[ $? -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
fi
echo "Public key [ ${deviceWgPublicKey} ] -- OK"

# 2. Send device info to the server [ register-device ]
echo ""
echo "2. Send device info to the server [ motherland.overvis.com ]..."
err_code=0
response=$(
    curl --silent --show-error -H "Content-Type: application/json" -d "{
        \"licenseId\": \"${licenseId}\",
        \"licensePassword\": \"${licensePassword}\",
        \"deviceWgPublicKey\": \"${deviceWgPublicKey}\",
        \"macAddress\": \"${macAddress}\",
        \"description\": \"${description}\",
        \"passwords\": []
    }" https://motherland.overvis.com/api/register-vpn-device/
) || ((err_code=$?))
if [ $err_code -ne 0 ]; then
    echo "$response"
    echo "Error, Script terminated by error"
    exit 1
fi
echo "Received response -- OK"

# 3. Parse response (JSON)
err_code=0
echo ""
echo "3. Parse response from the server..."
#
motherlandWgPublicKey=$(getJsonValue "motherlandWgPublicKey" "$response") || ((err_code|=$?))
echo "  @ motherlandWgPublicKey [ ${motherlandWgPublicKey} ]"
#
motherlandVpnIpAddress=$(getJsonValue "motherlandVpnIpAddress" "$response") || ((err_code|=$?))
echo "  @ motherlandVpnIpAddress [ ${motherlandVpnIpAddress} ]"
#
motherlandSshPublicKey=$(getJsonValue "motherlandSshPublicKey" "$response") || ((err_code|=$?))
echo "  @ motherlandSshPublicKey [ ${motherlandSshPublicKey} ]"
#
vpnIpAddress=$(getJsonValue "vpnIpAddress" "$response") || ((err_code|=$?))
echo "  @ vpnIpAddress [ ${vpnIpAddress} ]"
#
pinCode=$(getJsonValue "pinCode" "$response") || ((err_code|=$?))
echo "  @ pinCode [ ${pinCode} ]"
#
sku=$(getJsonValue "sku" "$response") || ((err_code|=$?))
echo "  @ sku [ ${sku} ]"
#
manufacturerName=$(getJsonValue "manufacturerName" "$response") || ((err_code|=$?))
echo "  @ manufacturerName [ ${manufacturerName} ]"
#
labelName=$(getJsonValue "labelName" "$response") || ((err_code|=$?))
echo "  @ labelName [ ${labelName} ]"
#
labelLink=$(getJsonValue "labelLink" "$response") || ((err_code|=$?))
echo "  @ labelLink [ ${labelLink} ]"
#
bindMacAddress=$(getJsonValue "macAddress" "$response") || ((err_code|=$?))
echo "  @ macAddress [ ${bindMacAddress} ]"
#
if [[ $err_code -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
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
wg-quick down wg0 || true
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

# 7. Save MAC to the file
echo ""
echo "7. Save MAC to the 'dev-bind-mac' file."
if [[ $bindMacAddress != $macAddress ]]; then
    $macAddress = $bindMacAddress
    umask 0077
    echo -n "${macAddress}" >"configs/dev-bind-mac"
    echo "Save new MAC -- OK"
else
    echo "Skipped."
fi

# 8. Save pin to the file
echo ""
echo "8. Save pin code to the 'dev-pin-code' file..."
umask 0077
echo -n "${pinCode}" >"/opt/opcb-release/wireguard/dev-pin-code"
echo "Pin code saved -- OK"

# 9. Save model to the file
echo ""
echo "9. Save model to the 'dev-model-name' file..."
umask 0077
echo -n "${labelName}" >"/opt/opcb-release/wireguard/dev-model-name"
echo "Pin code saved -- OK"

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
cd "/opt/opcb-release/scripts/manufacturer/"
bash "./mf-gen-label.sh" "${deviceWgPrivateKey}" "${labelName}" "${macAddress}" "${pinCode}" "${labelLink}" "/opt/opcb-release/wireguard/dev-label.png"
if [[ $? -ne 0 ]]; then echo "Error, Script terminated by error"; exit 1; fi
echo "Device info image created -- OK"

# Success
echo "-----SCRIPT COMPLETE-----"
exit 0