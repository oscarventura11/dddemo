#!/usr/bin/env bash

set -euo pipefail

if ! command -v tmux >/dev/null 2>&1; then
	echo "tmux is not installed; starting only the Vite dev server."
	exec pnpm dev
fi

if [[ ! -t 0 || ! -t 1 ]]; then
	echo "No interactive TTY detected; starting only the Vite dev server."
	exec pnpm dev
fi

SESSION="dev-$$"
trap "tmux kill-session -t $SESSION 2>/dev/null || true" EXIT HUP INT TERM
tmux new-session -d -s $SESSION "pnpm dev"
tmux split-window -t $SESSION -h "pnpm test; exec bash"
tmux split-window -t $SESSION -v "pnpm test:e2e; exec bash"
tmux attach-session -t $SESSION