#!/bin/bash
set -e

cd /opt/opcb-release
git fetch origin opcb-221-opiz --tags 
git pull origin opcb-221-opiz --ff-only
. setup.sh
