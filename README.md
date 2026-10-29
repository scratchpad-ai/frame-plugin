# Frame

Publish HTML apps and Markdown documents from your agent to Frame. Update a page as your work evolves, keep recurring reports together as dated editions, and propose Markdown revisions for an author to review.

This is Frame's standalone MCP plugin package for Cursor and Grok Bot distribution. It connects directly to Frame and does not require a Clearskies installation. Marketplace review and client acceptance testing are still pending.

## Connect directly

In a client that supports remote MCP with OAuth, add this server:

```json
{
  "mcpServers": {
    "frame": {
      "url": "https://app.frame.page/api/mcp"
    }
  }
}
```

Complete the browser sign-in and approve the connection in Frame. A Frame account and access to the desired content are required. No shared client secret or static token is included in the package. Manage the connection in Frame's **Settings → Connected apps**.

## Test the plugin locally in Cursor

Use Cursor 3.13 or newer. From this repository's root:

```bash
mkdir -p ~/.cursor/plugins/local
ln -s "$PWD" ~/.cursor/plugins/local/frame
```

Run **Developer: Reload Window**, then connect Frame when prompted. Teams and Enterprise workspaces may require an administrator to enable local plugin imports.

Once the marketplace listing is approved, users will be able to install the Frame listing through the marketplace. This README does not claim it is already listed or available in Grok Bot.

## Try it

- “Publish this project brief to my private drive in Frame.”
- “Turn this analysis into an HTML dashboard and publish it to Frame.”
- “Update the existing launch report in Frame with these results.”
- “Publish this week's report as a new edition of the existing series.”
- “Propose a rewrite of this Markdown section using its review comments.”

The `use-frame` skill selects a destination, distinguishes new pages from versions and editions, and handles Markdown revision drafts when enabled for the account. Series cadence does not create an automatic schedule.

## Content and access

The connection acts as the Frame user who authorizes it. Tool requests send the selected content and action to Frame; responses can contain accessible frame metadata, document content, comments, and draft candidates. The client manages OAuth credentials. The package contains no credentials or separate data store.

New frames default to the user's private drive. Existing permissions govern access; publishing a frame does not make it public. Check sharing in Frame before distributing a link. Draft candidates require an author to merge them in Frame.

## Development

`plugin.json` and `mcp.json` use the [Agent Plugins 1.0.0 format](https://agent-plugins.org). The Cursor adapter follows the same portable-manifest approach as [Clearskies](https://github.com/scratchpad-ai/clearskies-plugin).

After changing either portable manifest, regenerate and check the Cursor files:

```bash
node scripts/sync-manifests.mjs
node scripts/sync-manifests.mjs --check
```

CI validates the manifests against the official schemas and checks the skill. See the [Cursor plugin reference](https://cursor.com/docs/reference/plugins) for installation and submission requirements.

The plugin package is MIT licensed. It does not contain or license the Frame application server.
