const {
  McpServer,
} = require("@modelcontextprotocol/sdk/server/mcp");
const {
  StdioServerTransport,
} = require("@modelcontextprotocol/sdk/server/stdio");

const server = new McpServer({
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
  async *invoke(args) {
    const tz = args.tz || "UTC";
    const lang = args.lang || "en";

    const url = `https://orestislef.gr/shouldideploy/api.php?tz=${encodeURIComponent(
      tz,
    )}&lang=${encodeURIComponent(lang)}`;

    const response = await fetch(url);
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
  await transport.connect(server);
}

main().catch((err) => {
  console.error("Erro ao iniciar MCP server:", err);
  process.exit(1);
});

