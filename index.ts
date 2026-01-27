import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

type ShouldIDeployArgs = {
  tz?: string;
  lang?: string;
};

const server: any = new McpServer({
  name: "shouldideploy-today-mcp-server",
  version: "1.0.0",
});

server.tool("shouldideploy_today", {
  description:
    "Calls the public shouldideploy.today API to check if it is a good idea to deploy today.",
  inputSchema: {
    type: "object",
    properties: {
      tz: {
        type: "string",
        description:
          "IANA timezone (e.g., America/Sao_Paulo, UTC). If omitted, UTC is used.",
      },
      lang: {
        type: "string",
        description:
          "Response language (e.g., en, el). If omitted, en is used.",
      },
    },
    required: [],
  },
  async *invoke(args: ShouldIDeployArgs) {
    const tz = args.tz ?? "UTC";
    const lang = args.lang ?? "en";

    const url = new URL("https://shouldideploy.today/api");
    url.searchParams.set("tz", tz);
    url.searchParams.set("lang", lang);

    const response = await fetch(url.toString());
    const text = await response.text();

    yield {
      type: "text",
      text,
      isError: !response.ok,
    };
  },
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Should I Deploy Today MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Error starting MCP server:", err);
  process.exit(1);
});
