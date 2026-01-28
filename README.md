# shouldideploy-today-mcp-server

Simple MCP server that calls the public [`shouldideploy.today`](https://shouldideploy.today/) API to answer whether it is a good idea to deploy today.

### Requirements

- **Node.js** 18+ (20+ recommended)
- **npm** 9+

### Installation (from source)

In the project directory:

```bash
npm install
```

### How to run the MCP server

```bash
npm start
```

The server uses **stdio** as the transport (MCP default). Typically you do not call it directly; instead, you register it in an MCP client (such as Cursor, Claude Desktop, etc.).

### Installation via npm

Once published to npm, you can install the package globally:

```bash
npm install -g shouldideploy-today-mcp-server
```

This will make the `shouldideploy-today-mcp-server` binary available on your `PATH`.

### Using with an MCP client

Below is an example configuration snippet for a generic MCP client that supports process-based servers (adjust to your client's config format):

```json
{
  "mcpServers": {
    "shouldideploy-today": {
      "type": "stdio",
      "command": "shouldideploy-today-mcp-server",
      "args": []
    }
  }
}
```

After configuring and restarting your MCP client, you should see a tool named `shouldideploy_today` available.

### Available tool

- **Name**: `shouldideploy_today`
  - **Description**: Calls the `shouldideploy.today` API to check if it is a good idea to deploy today.
  - **Input (JSON)**:
    - `tz` _(string, optional)_: IANA timezone, for example `America/Sao_Paulo` or `UTC`. Default: `UTC`.
    - `lang` _(string, optional)_: response language, for example `en`. Default: `en`.
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
