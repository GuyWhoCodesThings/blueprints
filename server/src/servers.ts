import { Server, ServerOptions } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

declare class CustomServer extends Server {
  constructor(serverInfo: any, options?: ServerOptions);
  private setCustomRequestHandlers();
}



