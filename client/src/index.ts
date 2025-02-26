import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

async function main() {
    const url = new URL("http://localhost:3001/sse");
    const transport = new SSEClientTransport(url);
    const client = new Client(
    {
      name: "example-client",
      version: "1.0.0"
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {}
      }
    }
  );

  await client.connect(transport);

  // Implement your client logic here
  // For example:
//   const resources = await client.listResources();
//   console.log("Available resources:", resources);

  const tools = await client.listTools();
  console.log("Available tools:", tools);

  // using the echo tool
  const result = await client.callTool({
    name: 'echo',
    arguments: {
      // Include the necessary arguments based on the inputSchema
      message: "Hello, server!"
    }
  });
  
  console.log("Echo response:", result);

  // Keep the connection open
  process.on('SIGINT', () => {
    console.log('Closing client connection...');
    client.close();
    process.exit();
  });
}

main().catch(console.error);
