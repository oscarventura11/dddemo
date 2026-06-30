# Zettelkasten + Obsidian MCP Setup

This guide wires your project vault in `docs/` to an MCP-compatible AI client.

## 1) Use `docs/` as your Obsidian vault

1. Open Obsidian.
2. Select **Open folder as vault**.
3. Choose the `docs/` directory in this repository.

## 2) Keep note IDs stable

Use timestamp IDs in file names:

`YYYYMMDDHHmm-title.md`

This keeps wiki-links and MCP references stable over time.

## 3) Create notes quickly from terminal

```bash
mkdir -p docs/knowledge
ts=$(date +%Y%m%d%H%M)
cat > "docs/knowledge/${ts}-policy-decisions.md" <<'EOF'
# Policy decisions

Policy decisions should be explicit.
EOF
```

## 4) Configure Obsidian MCP in VS Code

This repository now includes a workspace MCP config at:

`.vscode/mcp.json`

Current server definition:

```json
{
  "servers": {
    "obsidian": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "obsidian-mcp-rs", "/workspaces/dddemo/docs"]
    }
  }
}
```

What you need to do:

1. Ensure Node.js is available (`node -v`).
2. Reload VS Code window.
3. Open Copilot Chat and verify MCP tools from `obsidian` are available.

Notes:

- Keep the vault path absolute.
- This setup uses `npx`, so no global install is required.

## 4.1) Optional explicit install commands

If you prefer installing instead of using `npx`:

```bash
# Global
npm install -g obsidian-mcp-rs

# Then in .vscode/mcp.json use:
# "command": "obsidian-mcp-rs"
```

Or as a project dependency:

```bash
pnpm add -D obsidian-mcp-rs

# Then in .vscode/mcp.json use:
# "command": "pnpm"
# "args": ["exec", "obsidian-mcp-rs", "/workspaces/dddemo/docs"]
```

## 5) Suggested minimal workflow

1. Capture: add rough ideas as draft notes under `docs/knowledge/`.
2. Distill: split long drafts into focused notes by topic.
3. Evergreen: promote durable ideas into stable reference notes.
4. Connect: create index/MOC notes that link related knowledge docs.
5. Execute: link architecture knowledge notes to implementation docs in `docs/architecture/`.

## 6) High-value prompt patterns with MCP

Use these prompts in your MCP client:

- "Create a permanent note from today\'s literature notes about policy design and link related notes."
- "Find unlinked permanent notes and suggest two structure notes to connect them."
- "Summarize all notes tagged `policy` into a single MOC outline."

## 7) Repository integration

- Keep notes versioned with code when they affect architecture decisions.
- Use one commit for code and one commit for note updates when possible.

## 8) Zettelkasten rules for this repository docs

All project documentation is treated as a Zettelkasten vault under `docs/`.

Rules:

1. New knowledge notes go in `docs/knowledge/` and use stable ID filenames:

- `YYYYMMDDHHmm-title.md`

2. Every new note should link to at least one existing note.
3. Prefer atomic notes (one idea per note) and connect them through MOC/index notes.
4. Keep architecture files in `docs/architecture/` as structure/reference notes (semantic filenames are allowed there).
5. Add or maintain frontmatter metadata (`tags`, optional `related`) to keep graph navigation useful.
6. When code behavior changes, update the connected architecture/knowledge notes in the same PR.

Recommended split:

- `docs/knowledge/`: literature, permanent notes, decision rationale, experiments.
- `docs/architecture/`: stable structure notes and implementation-facing references.
