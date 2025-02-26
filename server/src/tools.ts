import { Tool } from "@modelcontextprotocol/sdk/types";

export const ECHO_TOOL: Tool = {
    name: "echo",
    description: "...",
    inputSchema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "message you want to be echoed back"
        }
      },
      required: ["message"],
    },
  };


export const FETCH_MCP: Tool = {
    name: "fetch mcp",
    description: "use this when you want to add an mcp server's tools that you need to answer a query",
    inputSchema: {
      type: "object",
      properties: {
        query: {
            type: "string",
            description: "Search query (max 100 words)"
        },
        tags: {
            type: "string",
            description: "comma delimited tags, choose from (DB, SEARCH, STOCKS)",
            default: ""
        },
        count: {
            type: "number",
            description: "number of mcp servers to fetch",
            default: 1
        },
      },
      required: ["query"],
    },
}
  