#!/bin/bash
set -e

# Installing some package's
echo "Installing some package's..."
apt-get install -y wireguard nginx hostapd dnsmasq

# Configure wireguard
echo "Configure WireGuard..."
ln -sf /opt/opcb-release/wireguard/wgcli-start.sh /etc/network/if-up.d/opcb-wg-start

# Install server ssh key
#echo "Installing server ssh key..."
#ssh_wgsrv_key=$(cat "/opt/opcb-release/wireguard/ssh-wgsrv-key.pub")
#if !(sed -n "/${ssh_wgsrv_key}/p" "~/.ssh/authorized_keys"); then
#    echo "${ssh_wgsrv_key}" >> "~/.ssh/authorized_keys"
#fi

# Configure Nginx
echo "Configure Nginx..."
ln -sf /opt/opcb-release/nginx-sites/opcb-ui /etc/nginx/sites-enabled/default
systemctl restart nginx

# Configure hostapd & dnsmasq
echo "Configure Hostapd & Dnsmasq..."
systemctl unmask hostapd.service

# Install opcb service
echo "Configure OPCB-221..."
ln -sf /opt/opcb-release/services/opcb.service /etc/systemd/system/opcb.service
systemctl daemon-reload
systemctl enable opcb.service
systemctl restart opcb.service

# Install update to the crone
echo "Configure crone update..."
ln -sf /opt/opcb-release/update.sh /etc/cron.daily/opcb-update

echo "OPCB-221 Setup complete success."
