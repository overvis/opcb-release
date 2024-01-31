#!/bin/sh

PATH="/opcb/node/bin:$PATH"

cd opcb-runner
node dist/start ../runner-config.json
