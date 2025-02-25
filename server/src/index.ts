import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {}
    }
  }
);

// server.setRequestHandler(ListPromptsRequestSchema, async () => {
//   return {
//     prompts: [{
//       name: "example-prompt",
//       description: "An example prompt template",
//       arguments: [{
//         name: "arg1",
//         description: "Example argument",
//         required: true
//       }]
//     }]
//   };
// });

// server.setRequestHandler(GetPromptRequestSchema, async (request) => {
//   if (request.params.name !== "example-prompt") {
//     throw new Error("Unknown prompt");
//   }
//   return {
//     description: "Example prompt",
//     messages: [{
//       role: "user",
//       content: {
//         type: "text",
//         text: "Example prompt text"
//       }
//     }]
//   };
// });

const app = express();

// app.get("/sse", async (req, res) => {
//   const transport = new SSEServerTransport("/messages", res);
//   await server.connect(transport);
// });

// app.post("/messages", async (req, res) => {
//   // Note: to support multiple simultaneous connections, these messages will
//   // need to be routed to a specific matching transport. (This logic isn't
//   // implemented here, for simplicity.)
//   await transport.handlePostMessage(req, res);
// });

app.listen(3001);