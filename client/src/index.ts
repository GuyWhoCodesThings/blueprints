import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";

async function main() {
    const url = new URL("http://localhost:8080/sse");
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
    });
   
    await client.connect(transport);

    const tools = await client.listTools();
    console.log("Available tools:", tools);

    // console.log("Calling echo tool");
    // const result = await client.callTool({
    //     name: 'echo',
    //     arguments: {
    //         message: "Hello, server!"
    //     }
    // });
    // console.log("Echo response:", result);

    process.on('SIGINT', () => {
        console.log('Closing client connection...');
        client.close();
        process.exit();
    });
}

main().catch((error) => {
    console.error("Main function error:", error);
});
