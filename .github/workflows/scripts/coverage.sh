
#!/bin/bash

SCRIPT_RUN_COVERAGE=".github/workflows/scripts/run-coverage.js"

npm i -g @actions/core @actions/github
npm i --only=dev
npmGlobalModules=$( npm root -g | head -n 1 )
export NODE_PATH=$npmGlobalModules

node "$SCRIPT_RUN_COVERAGE" "$TOKEN" "$PR_NUMBER"