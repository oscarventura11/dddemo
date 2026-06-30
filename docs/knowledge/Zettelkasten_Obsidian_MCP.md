# Zettelkasten + Obsidian MCP Setup

This guide wires your project vault in `notes/` to an MCP-compatible AI client.

## 1) Use `notes/` as your Obsidian vault

1. Open Obsidian.
2. Select **Open folder as vault**.
3. Choose the `notes/` directory in this repository.

## 2) Keep note IDs stable

Use timestamp IDs in file names:

`YYYYMMDDHHmm-title.md`

This keeps wiki-links and MCP references stable over time.

## 3) Create notes quickly from terminal

```bash
chmod +x scripts/new-zettel.sh
./scripts/new-zettel.sh permanent "Policy decisions should be explicit"
./scripts/new-zettel.sh literature "Hexagonal architecture article notes"
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
      "args": ["-y", "obsidian-mcp-rs", "/workspaces/dddemo/notes"]
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
# "args": ["exec", "obsidian-mcp-rs", "/workspaces/dddemo/notes"]
```

## 5) Suggested minimal workflow

1. Capture: put rough ideas in `00 Inbox`.
2. Distill: convert into `10 Fleeting` and `20 Literature` notes.
3. Evergreen: promote durable ideas into `30 Permanent`.
4. Connect: organize with `40 Structures` MOC notes.
5. Execute: link project actions in `50 Projects`.

## 6) High-value prompt patterns with MCP

Use these prompts in your MCP client:

- "Create a permanent note from today\'s literature notes about policy design and link related notes."
- "Find unlinked permanent notes and suggest two structure notes to connect them."
- "Summarize all notes tagged `policy` into a single MOC outline."

## 7) Repository integration

- Keep notes versioned with code when they affect architecture decisions.
- Use one commit for code and one commit for note updates when possible.
