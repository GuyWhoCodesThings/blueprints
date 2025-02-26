import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { LRU, ToolCache } from "./cache"
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { ECHO_TOOL } from "./tools";

const TOOL_CAPACITY = 10;
const PORT = 3001;
const app = express();

let transport: SSEServerTransport | null = null;

app.get("/sse", (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});


const server = new Server(
  {
    name: "example-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {},
      tools: {}
    }
  }
);

const sseTransports = new Map<SSEServerTransport, string>();

// need to override this to use LRU cache with sse uids
server.setRequestHandler(ListToolsRequestSchema, async () => {
  if (!transport) {
    throw new Error(`must be connected via sse to list tools`);
  }
  const uuid = sseTransports.get(transport);
  // Add the UUID to the tool list
  const toolsWithUuid = [{ ...ECHO_TOOL, uuid }];
  return { tools: toolsWithUuid };
});


server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error("No arguments provided");
    }

    switch (name) {
      case "echo": {
        const message = args.message;
        return {
          content: [{ type: "text", text: `Tool echo: ${message} - from your favorite server (:` }],
          isError: false
        };
      }
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});