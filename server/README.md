# Server

## Overview

This directory contains the server-side code for implementing a Model Context Protocol (MCP) server using Express.js and the `@modelcontextprotocol/sdk`. The server exposes tools and resources that clients can access via HTTP and SSE.

## Key Components

-   `src/index.ts`: The main entry point for the server application.

-   `@modelcontextprotocol/sdk`: The Model Context Protocol SDK for server-side functionality.

## Getting Started

1.  Navigate to the `server` directory:

    ```
    cd server
    ```

2.  Install dependencies:

    ```
    npm install
    ```

## Running the Server

1.  Start the server:

    ```
    npm run dev
    ```

## Code Overview

The server performs the following actions:

1.  Creates an Express.js server.

2.  Sets up an SSE endpoint for client connections.

3.  Creates an MCP server instance and registers tools.

4.  Handles requests to list available tools and call them with appropriate arguments.

## Tool Definitions

Tools are defined as follows:

-   `name`: The unique name of the tool.

-   `description`: A description of what the tool does.

-   `inputSchema`: A JSON schema describing the expected input arguments.

## Request Handlers

-   `ListToolsRequestSchema`: Returns a list of available tools to the client.

-   `CallToolRequestSchema`: Executes a specific tool with the provided arguments and returns the results.

## Dependencies

-   `@modelcontextprotocol/sdk`

-   `express`

-   `zod`

-   `dotenv`

## Notes

-   Customize the server logic to implement additional tools, resources, and functionality.

-   Implement error handling and logging as needed.
