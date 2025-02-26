# Client

## Overview

This directory contains the client-side code for interacting with the Model Context Protocol (MCP) server. It establishes a connection to the server via Server-Sent Events (SSE), lists available tools, and calls them with appropriate arguments.

## Key Components

-   `src/index.ts`: The main entry point for the client application.

## Getting Started

1.  Navigate to the `client` directory:

    ```
    cd client
    ```

2.  Install dependencies:

    ```
    npm install
    ```

## Running the Client

1.  Start the client:

    ```
    npm run dev
    ```

## Code Overview

The client performs the following actions:

1.  Establishes a connection to the SSE endpoint on the server.

2.  Lists the available tools using the `client.listTools()` method.

3.  Calls a specific tool (e.g., `echo`) with the required arguments using the `client.callTool()` method.

4.  Logs the results to the console.

## Dependencies

-   `@modelcontextprotocol/sdk`
-   `eventsource`

## Notes

-   Ensure the server is running before starting the client.

-   Customize the client logic to interact with different tools and resources offered by the server.
