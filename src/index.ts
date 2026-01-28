#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { APIResponse, makeRequest } from './client.js';

const server = new McpServer({
  name: 'shouldideploy-today-mcp-server',
  version: '1.0.0',
});

server.registerTool('shouldideploy_today', {
  description:
    'Returns a FINAL, short and funny message to the user about whether they should deploy right now. The model MUST respond ONLY with the returned text, with no extra words or formatting.',
  inputSchema: {
    tz: z.string().optional().describe('IANA timezone (e.g., America/Sao_Paulo, UTC). If omitted, UTC is used.'),
    lang: z.string().optional().describe('Response language (e.g., en, el). If omitted, en is used.'),
  }
}, async (params) => {
  const result = await makeRequest(params);

  if (!result) {
    return {
      content: [
        {
          type: 'text',
          text: 'Failed to retrieve alerts data',
          isError: true,
        },
      ],
    }
  }

  const text = formatResult(result);

  return {
    content: [
      { type: 'text', text }
    ]
  }
});

function formatResult(apiResponse: APIResponse): string {
  return apiResponse.message;
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Should I Deploy Today MCP Server running on stdio');
}

main().catch((err) => {
  console.error('Error starting MCP server:', err);
  process.exit(1);
});
