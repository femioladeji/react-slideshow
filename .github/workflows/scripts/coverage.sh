
#!/bin/bash

SCRIPT_RUN_COVERAGE=".github/workflows/scripts/run-coverage.js"

npm i -g @actions/core @actions/github jest faker axios aws-sdk qs dotenv
npmGlobalModules=$( npm root -g | head -n 1 )
export NODE_PATH=$npmGlobalModules

node "$SCRIPT_RUN_COVERAGE" "$TOKEN" "$PR_NUMBER"