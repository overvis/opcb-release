#!/bin/bash
set -e

cd /opt/opcb-release
git fetch origin opcb-221-bpi5 --tags 
git pull origin opcb-221-bpi5 --ff-only
. setup.sh
