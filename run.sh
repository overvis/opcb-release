#!/bin/sh

PATH="/opcb/node/bin:$PATH"

# Without this line, we have 300% CPU node process load (sometimes).
# https://github.com/nodejs/node/issues/49937#issuecomment-1740043618
export UV_USE_IO_URING=0

cd opcb-runner
node dist/start ../runner-config.json
