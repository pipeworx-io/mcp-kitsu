# @pipeworx/kitsu

[Kitsu](https://kitsu.io) MCP — anime + manga catalogue (JSON:API). Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `search_anime(query, limit?)`
- `search_manga(query, limit?)`
- `anime(id)` — full anime entry by id
- `manga(id)` — full manga entry by id
- `top_anime(by?, limit?)` — top anime (by popularityRank | ratingRank)
- `top_manga(by?, limit?)` — top manga
- `categories(limit?)` — list categories

## Data source

`https://kitsu.io/api/edge/`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "kitsu": {
      "url": "https://gateway.pipeworx.io/kitsu/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Kitsu data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
