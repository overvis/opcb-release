#!/bin/bash
set -e

cd /opt/opcb-release
git fetch origin opcb-221-opipc --tags 
git pull origin opcb-221-opipc --ff-only
. setup.sh
