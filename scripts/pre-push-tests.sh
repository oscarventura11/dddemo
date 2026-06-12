#!/bin/bash

# Check if there are any changes to stash
# We check for both tracked and untracked changes
HAS_CHANGES=$(git status --short)

if [ -n "$HAS_CHANGES" ]; then
    echo "--------------------------------------------------"
    echo "  Stashing uncommitted changes for clean tests..."
    echo "--------------------------------------------------"
    STASH_NAME="husky-pre-push-$(date +%s)"
    git stash push -m "$STASH_NAME" --include-untracked
    STASHED=true
else
    STASHED=false
fi

echo "--------------------------------------------------"
echo "  Running tests before push..."
echo "--------------------------------------------------"
pnpm test -- --run
TEST_RESULT=$?

if [ "$STASHED" = true ]; then
    echo "--------------------------------------------------"
    echo "  Restoring stashed changes..."
    echo "--------------------------------------------------"
    # Pop the stash by name or just the top one if we know we just pushed it
    git stash pop --quiet
fi

if [ $TEST_RESULT -ne 0 ]; then
    echo ""
    echo "❌ Tests failed! Push aborted."
    echo "--------------------------------------------------"
    exit 1
fi

echo ""
echo "✅ Tests passed! Proceeding with push."
echo "--------------------------------------------------"
exit 0
