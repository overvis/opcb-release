#!/bin/bash
set -e

apt-get install -y nginx
ln -sf /opt/opcb-release/nginx-sites/opcb-ui /etc/nginx/sites-enabled/opcb-ui
systemctl restart nginx

ln -sf /opt/opcb-release/services/opcb.service /etc/systemd/system/opcb.service
systemctl daemon-reload
systemctl enable opcb.service
systemctl restart opcb.service

ln -sf /opt/opcb-release/update.sh /etc/cron.daily/opcb-update.sh
