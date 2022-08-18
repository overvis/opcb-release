#!/bin/bash
set -euo pipefail

# Install dirmngr
echo "# Install 'dirmngr'..."
[[ $(apt list --installed dirmngr 2>/dev/null | grep dirmngr) ]] || apt-get update
apt-get install -y dirmngr

# Add some package list
echo "# Add some package list..."
curl -fsSL https://packages.redis.io/gpg | gpg --yes --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/redis.list
#[[ $(apt-key list --list-keys 8B48AD6246925553 2>/dev/null) ]] || apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8B48AD6246925553
[[ $(apt-key list --list-keys 648ACFD622F3D138 2>/dev/null) ]] || apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 648ACFD622F3D138
[[ $(apt-key list --list-keys 0E98404D386FA1D9 2>/dev/null) ]] || apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 0E98404D386FA1D9
echo "deb http://deb.debian.org/debian/ unstable main" | tee /etc/apt/sources.list.d/unstable.list
printf 'Package: *\nPin: release a=unstable\nPin-Priority: 150\n' | tee /etc/apt/preferences.d/limit-unstable

# Installing some package's
# + hostapd
# + dnsmasq
# + resolvconf
# + network-manager
# + wireguard
# + redis
# + nginx
echo "# Installing some package's..."
apt-get update
apt-get install -y hostapd dnsmasq resolvconf network-manager wireguard redis-server nginx

# Configure package's
echo "# Stopping resident package's..."
declare -a namedaemon=("dhcpcd" "wpa_supplicant" "redis-server" "hostapd" "dnsmasq")
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
ls -sf /run/resolvconf/resolv.conf /etc/resolv.conf

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

# Configure update to the crone
echo "# Configure crone update..."
ln -sf /opt/opcb-release/update.sh /etc/cron.daily/opcb-update

# Configure wireguard
echo "# Configure WireGuard VPN..."
ln -sf /opt/opcb-release/wireguard/wgcli-check.cron /etc/cron.d/wg-check
ln -sf /opt/opcb-release/wireguard/wg0.conf /etc/wireguard/wg0.conf
systemctl daemon-reload
systemctl restart wg-quick@wg0
systemctl enable wg-quick@wg0

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
