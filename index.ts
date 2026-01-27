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
    "Consulta a API pública shouldideploy.today para saber se é uma boa ideia fazer deploy hoje.",
  inputSchema: {
    type: "object",
    properties: {
      tz: {
        type: "string",
        description:
          "Timezone IANA (ex: America/Sao_Paulo, UTC). Se omitido, usa UTC.",
      },
      lang: {
        type: "string",
        description: "Idioma da resposta (ex: en, el). Se omitido, usa en.",
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
  console.error("Erro ao iniciar MCP server:", err);
  process.exit(1);
});
