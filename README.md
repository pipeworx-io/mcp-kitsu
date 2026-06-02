# mcp-kitsu

Kitsu MCP — anime + manga catalogue (JSON:API).

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search_anime` | Search anime by name. |
| `search_manga` | Search manga by name. |
| `anime` | Anime entry by id. |
| `manga` | Manga entry by id. |
| `top_anime` | Top anime list. |
| `top_manga` | Top manga list. |
| `categories` | List categories (genres / themes). |

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

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
