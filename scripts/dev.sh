#!/usr/bin/env bash

SESSION="dev-$$"
trap "tmux kill-session -t $SESSION 2>/dev/null || true" EXIT HUP INT TERM
tmux new-session -d -s $SESSION "pnpm dev"
tmux split-window -t $SESSION -h "pnpm test; exec bash"
tmux split-window -t $SESSION -v "pnpm test:e2e; exec bash"
tmux attach-session -t $SESSION