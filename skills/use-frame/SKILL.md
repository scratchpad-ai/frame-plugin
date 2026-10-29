---
name: use-frame
description: Publish HTML apps, dashboards, and Markdown documents to Frame; update existing frames; publish dated editions of recurring reports; or propose a Markdown revision for review. Use when the user asks to publish, read, organize, or revise content in Frame.
---

# Frame

Use the connected Frame MCP tools. Frame has its own account and connection; no Clearskies plugin is required. If authentication is needed, let the client open Frame's browser authorization flow.

## Choose the destination

Call `list_artifacts` to find existing frames and destinations. A top-level folder is a drive. Inspect the destination's own `can_write` value; a writable drive does not imply every child is writable. Use `get_artifact` to check a specific node. Use `whoami` when the active identity is unclear.

Use the destination the user specified. If none is specified for a new frame, use `default_folder_id`, the user's private drive. A frame may be shared directly even when its containing drive is not visible. A returned URL does not prove the page is public or accessible to a particular recipient.

## Publish and update

- Use `create_artifact` for a new page and `publish_version` to update an existing frame. Look for the existing frame before creating a replacement.
- Send exactly one of `html` or `markdown`. Keep documents as Markdown; send a complete HTML document for an interactive app or dashboard.
- Use `create_series` with `publish_edition` for recurring reports. Reuse the series for subsequent editions. Publishing the same date again corrects that edition. Cadence is a label and does not schedule future work.
- Use `list_editions` to inspect past editions and follow `has_more` with the returned pagination cursor date when needed.
- For tools exposing `idempotency_key`, reuse the same key only when retrying the same logical write. A reused key can return the original result even if the content changed.

Stay within the requested publishing or editing scope. A request for a draft does not authorize publishing a version. Return the tool's actual page or draft link and describe what was saved. If the result is ambiguous, inspect the existing frame before repeating a write.

## Propose a Markdown revision

When the user wants a revision for review, use the draft tools when available:

1. Read `get_artifact_content` and select a returned section ID, or the whole document with a null section ID.
2. Read relevant `list_comments` and `list_drafts` to understand the requested changes and existing work.
3. Use `start_draft`, then `submit_candidate`. For a section draft, submit the complete replacement section including its heading, with nested headings deeper than that heading. For a block draft, pass exact unique block text when starting it and submit only that block's replacement.
4. Return the draft link. An author reviews and merges the candidate in Frame; the MCP does not merge it.

Drafts support Markdown, and their availability depends on the account. If a tool reports that drafting is unavailable, explain the limitation and provide the proposed revision in chat. Do not silently publish it instead.
