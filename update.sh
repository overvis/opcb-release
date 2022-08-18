#!/bin/bash
set -e

cd /opt/opcb-release
git fetch origin opcb-221-bpi4 --tags 
git pull origin opcb-221-bpi4 --ff-only
. setup.sh
