---
tags:
  - type/permanent
  - topic/knowledge-management
  - topic/zettelkasten
related:
  - "./Zettelkasten_Obsidian_MCP.md"
  - "../architecture/README.md"
---

# What Is Zettelkasten

Zettelkasten is a note-taking technique focused on building a connected network of ideas instead of storing isolated documents.

## Core idea

- Write small, atomic notes where each note captures one clear idea.
- Link notes to related notes by meaning.
- Let understanding and insight emerge from connections over time.

## How it differs from classic note storage

1. Notes are not organized only by folders.
2. Notes are connected by links, tags, and references.
3. Notes are refined continuously from rough capture to reusable knowledge.

## Typical flow

1. Capture notes: quick raw ideas from coding, reading, or meetings.
2. Literature notes: source summaries in your own words.
3. Permanent notes: concise standalone insights you can reuse.
4. Structure notes (MOC): index notes that connect related permanent notes.

## Key principles

- Atomicity: one concept per note.
- Own words: avoid copy-paste as final knowledge.
- Linking first: connect each new note to existing notes.
- Iteration: refine notes as understanding improves.
- Retrieval over storage: optimize for future thinking and writing.

## Why this helps in software projects

- Improves long-term recall of architecture decisions.
- Makes trade-offs and rationale easier to recover.
- Helps discover patterns across features and incidents.
- Speeds up writing docs, ADRs, and onboarding content.

## Example in this repository

1. Read about DDD boundaries.
2. Create a literature note summarizing the source.
3. Create permanent notes such as:
   - Application services orchestrate use cases but do not hold domain invariants.
   - Mappers are an anti-corruption layer between raw data and domain.
4. Link those notes to implementation docs in `docs/architecture/`.

## Practical rule of thumb for this repo

- If it describes what the system currently does, keep it in `docs/architecture/`.
- If it explains why, lessons learned, experiments, or evolving understanding, keep it in `docs/knowledge/`.
