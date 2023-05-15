#!/bin/sh

set -s

tee /lib/systemd/system/opcb.service >/dev/null << EOF
[Unit]
Description=OPCB Runner Service
Documentation="https://github.com/overvis/opcb-release/"
Wants=network.target
After=syslog.target network.target

[Service]
Type=simple
User=root
Group=root
OOMScoreAdjust=-100
WorkingDirectory=$PWD
ExecStart=$PWD/run.sh
Restart=always
TimeoutSec=3
RestartSec=2

[Install]
WantedBy=multi-user.target
EOF

chmod 644 /lib/systemd/system/opcb.service
systemctl daemon-reload
systemctl enable opcb.service
systemctl start opcb.service
