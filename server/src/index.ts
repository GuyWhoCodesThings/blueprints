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

const TOOL_CAPACITY = 10;
const PORT = 3001;
const app = express();

const toolCache: ToolCache<number, string> = new LRU(10);

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

// Define tools
const tools = [
  {
    name: "echo",
    description: "Echo a message",
    parameters: {
      type: "object",
      properties: {
        message: { type: "string" }
      },
      required: ["message"]
    }
  }
];

// need to override this to use LRU cache with sse uids
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error("No arguments provided");
    }

    switch (name) {
      case "echo": {
        if (!args.message) {
          throw new Error("Invalid arguments for echo");
        }
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
