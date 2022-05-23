#!/bin/bash
set -e

cd /opt/opcb-release
git fetch origin opcb-221-rpi4 --tags 
git pull origin opcb-221-rpi4 --ff-only
. setup.sh
