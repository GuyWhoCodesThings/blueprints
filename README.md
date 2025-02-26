# Blueprints Project

## Overview

This project is a Model Context Protocol (MCP) server example that uses a client to interact with the server. It demonstrates the implementation of a basic server with tools, client connections via SSE, and inter-process communication.

## Project Structure

The project is organized into the following directories:

-   `client`: Contains the client-side code, including the client transport and logic for interacting with the server.
-   `server`: Contains the server-side code, including the Express server, MCP server implementation, and tool definitions.
-   `tests`: (Optional) Contains unit or integration tests for the project.

## Getting Started

### Prerequisites

-   Node.js (version 16 or higher)
-   npm (Node Package Manager)

### Installation

1.  Clone the repository:

    ```
    git clone [repository-url]
    cd [project-directory]
    ```

2.  Install dependencies for both the client and server:

    ```
    cd client
    npm install
    cd ../server
    npm install
    cd ..
    ```

### Running the Project

1.  Start the server:

    ```
    cd server
    npm run dev
    cd ..
    ```

2.  Start the client in a separate terminal:

    ```
    cd client
    npm run dev
    cd ..
    ```

## Key Components

### Client

-   Implements the client-side logic for interacting with the server.
-   Uses SSE for real-time communication.
-   Demonstrates how to list available tools and call them with appropriate arguments.

### Server

-   Express.js server to handle HTTP requests and SSE connections.
-   Model Context Protocol (MCP) server implementation for defining and managing tools.
-   Includes example tools such as the `echo` tool or integration with the Brave Search API.

## Contributing

Contributions are welcome! Please submit pull requests with clear descriptions of the changes.
