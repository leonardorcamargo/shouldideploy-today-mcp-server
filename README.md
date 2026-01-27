shouldideploy-today-mcp-server
================================

Simple MCP server that calls the public [`shouldideploy.today`](https://shouldideploy.today/) API to answer whether it is a good idea to deploy today.

### Requirements

- **Node.js** 18+ (20+ recommended)
- **npm** 9+

### Installation

In the project directory:

```bash
npm install
```

### How to run the MCP server

```bash
npm start
```

The server uses **stdio** as the transport (MCP default). Typically you do not call it directly; instead, you register it in an MCP client (such as Cursor, Claude Desktop, etc.).

### Available tool

- **Name**: `shouldideploy_today`  
  - **Description**: Calls the `shouldideploy.today` API to check if it is a good idea to deploy today.
  - **Input (JSON)**:
    - `tz` *(string, optional)*: IANA timezone, for example `America/Sao_Paulo` or `UTC`. Default: `UTC`.
    - `lang` *(string, optional)*: response language, for example `en`. Default: `en`.
  - **Output**: plain text returned by the API, for example something like “Yes, you should deploy today” or “No, you should not deploy today”.

### How it works

- The server is implemented in `index.ts` using `@modelcontextprotocol/sdk`:
  - Creates an `McpServer` named `shouldideploy-today-mcp-server`.
  - Exposes the `shouldideploy_today` tool.
  - Builds the API URL using `URL` and `searchParams`:
    - Base: `https://shouldideploy.today/api`
    - Query params: `tz` and `lang`
  - Performs an HTTP `fetch`, reads the body as text and returns it as the MCP response.

### License

This project is distributed under the MIT license. See `LICENSE` for more details.