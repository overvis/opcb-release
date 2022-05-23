#!/bin/bash
set -e

# Installing some package's
# + wireguard
# + redis
# + nginx
# + hostapd
# + dnsmasq
echo "# Installing some package's..."
apt-get install -y wireguard redis nginx hostapd dnsmasq

# Configure wireguard
echo "# Configure WireGuard..."
ln -sf /opt/opcb-release/wireguard/wgcli-start.sh /etc/network/if-up.d/opcb-wg-start

# Configure redis
echo "# Configure Redis..."
systemctl stop redis-server
systemctl disable redis-server

# Configure Nginx
echo "# Configure Nginx..."
ln -sf /opt/opcb-release/nginx-sites/opcb-ui /etc/nginx/sites-enabled/default
systemctl restart nginx

# Configure hostapd & dnsmasq
echo "# Configure Hostapd & Dnsmasq..."
systemctl unmask hostapd

# Install opcb service
echo "# Configure OPCB-221..."
ln -sf /opt/opcb-release/services/opcb.service /etc/systemd/system/opcb.service
systemctl daemon-reload
systemctl enable opcb
systemctl restart opcb

# Install update to the crone
echo "# Configure crone update..."
ln -sf /opt/opcb-release/update.sh /etc/cron.daily/opcb-update

echo "# OPCB-221 Setup complete success."
