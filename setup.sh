#!/bin/bash
set -e

#install wireguard
apt-get install -y wireguard

# Install nginx
apt-get install -y nginx
ln -sf /opt/opcb-release/nginx-sites/opcb-ui /etc/nginx/sites-enabled/opcb-ui
systemctl restart nginx

# Install opcb service
ln -sf /opt/opcb-release/services/opcb.service /etc/systemd/system/opcb.service
systemctl daemon-reload
systemctl enable opcb.service
systemctl restart opcb.service

# Install update to the crone
ln -sf /opt/opcb-release/update.sh /etc/cron.daily/opcb-update
