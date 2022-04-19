#!/bin/bash
set -e

cd /opt/opcb-release
git pull origin opcb-221-rpi3
. setup.sh
