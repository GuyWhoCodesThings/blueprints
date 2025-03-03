import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { Tool } from "@modelcontextprotocol/sdk/types";

export type RequestHandlerExtra = {
  /**
   * An abort signal used to communicate if the request was cancelled from the sender's side.
   */
  signal: AbortSignal;
  sessionId: String;
};


class CustomServer extends Server {
  private sessionId: string | undefined;

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  setRequestHandler<T extends z.ZodType>(
    schema: T,
    handler: (request: z.infer<T>, sessionId: string | undefined) => Promise<SendResultT>
  ): void {
    super.setRequestHandler(schema, async (request, extra) => {
      return handler(request, this.sessionId);
    });
  }
}
