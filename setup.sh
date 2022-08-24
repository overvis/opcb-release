#!/bin/bash
set -euo pipefail

# Configure update to the crone
echo "# Configure crone update..."
ln -sf /opt/opcb-release/update.sh /etc/cron.daily/opcb-update

# Installing some package's
# + hostapd
# + dnsmasq
# + resolvconf
# + network-manager
# + wireguard
# + nginx
# + qrencode
# + imagemagick
echo "# Installing some package's..."
apt-get update
apt-get install -y hostapd dnsmasq resolvconf network-manager wireguard nginx qrencode imagemagick

# Configure package's
echo "# Stopping resident package's..."
declare -a namedaemon=("dhcpcd" "wpa_supplicant" "hostapd" "dnsmasq")
for item in ${namedaemon[@]}
do
    if [[ $(systemctl is-active $item) == "active" ]]; then
        echo "Stoping '$item'..."
        systemctl stop $item
    fi
    if [[ $(systemctl is-enabled $item) == "enabled" ]]; then
        echo "Disabling '$item'..."
        systemctl disable $item
    fi
done

# Configure resolvconf
echo "# Configure 'resolvconf' => '/etc/resolv.conf'..."
systemctl start resolvconf
systemctl enable resolvconf
ln -sf /run/resolvconf/resolv.conf /etc/resolv.conf

# Configure 'network' => '/etc/network/interfaces'
echo "# Configure 'network' => '/etc/network/interfaces'..."
file1="/opt/opcb-release/configs/interfaces"
file2="/etc/network/interfaces"
if !(cmp -s "$file1" "$file2"); then
    cp -f "$file2" "${file2}.bak"
    cp -f "$file1" "$file2"
    systemctl restart "networking.service"
else
    systemctl start "networking.service"
fi

# Configure 'NetworkManager' => '/etc/NetworkManager/NetworkManager.conf'
echo "# Configure 'NetworkManager' => '/etc/NetworkManager/NetworkManager.conf'"
file1="/opt/opcb-release/configs/NetworkManager.conf"
file2="/etc/NetworkManager/NetworkManager.conf"
if !(cmp -s "$file1" "$file2"); then
    cp -f "$file2" "${file2}.bak"
    cp -f "$file1" "$file2"
    systemctl restart NetworkManager.service
else
    systemctl start NetworkManager.service
fi

# Install 'fix-mac-addr.sh' script (apply for Banana Pi M4 only)
echo "# Install 'fix-mac-addr.service'..."
file1="/opt/opcb-release/services/fix-mac-addr.service"
file2="/opt/opcb-release/scripts/fix-mac-addr.sh"
if [[ -f "$file1" ]] && [[ -f "$file2" ]]; then
    if [[ $(systemctl is-active fix-mac-addr.service) != "active" ]]; then
        ln -sf "$file1" /etc/systemd/system/fix-mac-addr.service
        systemctl daemon-reload
        systemctl start fix-mac-addr.service
        systemctl enable fix-mac-addr.service
    else
        echo "Skip 'fix-mac-addr', already installed."
    fi
else
    echo "Skip 'fix-mac-addr', files  not found."
fi

# Configure wireguard
echo "# Configure WireGuard VPN..."
echo "Install wg-watchdog to the cron..."
ln -sf /opt/opcb-release/wireguard/wg-watchdog.cron /etc/cron.d/wg-watchdog
echo "Start wireguard VPN service..."
file1="/opt/opcb-release/wireguard/wg0.conf"
file2="/etc/wireguard/wg0.conf"
if [[ -f "$file1" ]] && [[ "$(cat $file1)" != "" ]]; then
    ln -sf "$file1" "$file2"
    systemctl restart wg-quick@wg0
    systemctl enable wg-quick@wg0
else
    echo "Skip but 'wg0.conf' is empty or not found."
fi


# Configure Nginx
echo "# Configure Nginx..."
ln -sf /opt/opcb-release/nginx-sites/opcb-ui /etc/nginx/sites-enabled/default
systemctl restart nginx
systemctl enable nginx

# Install OPCB service
echo "# Configure OPCB-221..."
ln -sf /opt/opcb-release/services/opcb.service /etc/systemd/system/opcb.service
systemctl daemon-reload
systemctl restart opcb.service
systemctl enable opcb.service

echo "# OPCB-221 Setup complete success."
