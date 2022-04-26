#!/bin/bash
set -e

cd /opt/opcb-release
git fetch origin opcb-221-rpi3 --tags 
git pull origin opcb-221-rpi3
. setup.sh
