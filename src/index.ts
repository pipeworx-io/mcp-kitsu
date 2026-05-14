interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Kitsu MCP — anime + manga catalogue (JSON:API).
 *
 * Auth: none. Docs: https://kitsu.docs.apiary.io/
 */


const BASE = 'https://kitsu.io/api/edge';
const UA = 'pipeworx-mcp-kitsu/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'search_anime',
    description: 'Search anime by name.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, limit: { type: 'number', description: '1-20 (default 10)' } },
      required: ['query'],
    },
  },
  {
    name: 'search_manga',
    description: 'Search manga by name.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, limit: { type: 'number' } },
      required: ['query'],
    },
  },
  {
    name: 'anime',
    description: 'Anime entry by id.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'manga',
    description: 'Manga entry by id.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'top_anime',
    description: 'Top anime list.',
    inputSchema: {
      type: 'object',
      properties: {
        by: { type: 'string', description: 'popularityRank (default) | ratingRank' },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'top_manga',
    description: 'Top manga list.',
    inputSchema: {
      type: 'object',
      properties: {
        by: { type: 'string' },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'categories',
    description: 'List categories (genres / themes).',
    inputSchema: {
      type: 'object',
      properties: { limit: { type: 'number' } },
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_anime':
      return kitsuGet(`/anime?filter[text]=${encodeURIComponent(reqStr(args, 'query', '"naruto"'))}&page[limit]=${pageLimit(args)}`);
    case 'search_manga':
      return kitsuGet(`/manga?filter[text]=${encodeURIComponent(reqStr(args, 'query', '"berserk"'))}&page[limit]=${pageLimit(args)}`);
    case 'anime':
      return kitsuGet(`/anime/${encodeURIComponent(reqStr(args, 'id', '"1"'))}`);
    case 'manga':
      return kitsuGet(`/manga/${encodeURIComponent(reqStr(args, 'id', '"1"'))}`);
    case 'top_anime':
      return kitsuGet(`/anime?sort=${sortKey(args)}&page[limit]=${pageLimit(args)}`);
    case 'top_manga':
      return kitsuGet(`/manga?sort=${sortKey(args)}&page[limit]=${pageLimit(args)}`);
    case 'categories':
      return kitsuGet(`/categories?page[limit]=${pageLimit(args)}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function pageLimit(args: Record<string, unknown>): number {
  return Math.min(20, Math.max(1, (args.limit as number) ?? 10));
}

function sortKey(args: Record<string, unknown>): string {
  const by = String(args.by ?? 'popularityRank').toLowerCase();
  if (by === 'ratingrank' || by === 'rating') return 'ratingRank';
  return 'popularityRank';
}

async function kitsuGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/vnd.api+json', 'User-Agent': UA },
  });
  if (res.status === 404) throw new Error('Kitsu: not found');
  if (!res.ok) throw new Error(`Kitsu: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
