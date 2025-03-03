import express from 'express'
import bodyParser from 'body-parser'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { z } from 'zod'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { CallToolRequestSchema, JSONRPCMessage, JSONRPCRequest, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { readFileSync } from 'fs'
import { ECHO_TOOL } from './tools'
import{ Request, Response } from 'express';

const log = (...args: any[]) => console.log('[supergateway]', ...args)
const logStderr = (...args: any[]) => console.error('[supergateway]', ...args)
function getVersion(): string {
  try {
    const packageJsonPath = join(__dirname, '../package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    return packageJson.version || '1.0.0'
  } catch (err) {
    console.error('[supergateway] Unable to retrieve version:', err)
    return 'unknown'
  }
}

const MultiLevelSseServer = async (
  port: number,
  baseUrl: string,
  ssePath: string,
  messagePath: string
) => {
  log('Starting...')
  log('Supergateway is supported by Superinterface - https://superinterface.ai')
  log(`  - port: ${port}`)
  if (baseUrl) {
    log(`  - baseUrl: ${baseUrl}`)
  }
  log(`  - ssePath: ${ssePath}`)
  log(`  - messagePath: ${messagePath}`)

  const server = new Server(
    { name: 'supergateway', version: getVersion() },
    { capabilities: {
      tools: {}
    } }
  )

  const sessions: Record<string, { transport: SSEServerTransport; response: express.Response }> = {}

  let transport: null | SSEServerTransport = null;

  const app = express()
  app.use((req, res, next) => {
    if (req.path === messagePath) return next()
    return bodyParser.json()(req, res, next)
  })

  app.get(ssePath, async (req, res) => {
    log(`New SSE connection from ${req.ip}`)

    transport = new SSEServerTransport(`${baseUrl}${messagePath}`, res);
    await server.connect(transport);

    return;

    const sseTransport = new SSEServerTransport(`${baseUrl}${messagePath}`, res)
    await server.connect(sseTransport)

    const sessionId = sseTransport.sessionId

    if (sessionId) {
      sessions[sessionId] = { transport: sseTransport, response: res }
    }

    sseTransport.onmessage = (msg: JSONRPCMessage) => {
      const line = JSON.stringify(msg)
      log(`SSE → Child (session ${sessionId}): ${line}`)
    }

    sseTransport.onclose = () => {
      log(`SSE connection closed (session ${sessionId})`)
      delete sessions[sessionId]
    }

    sseTransport.onerror = err => {
      logStderr(`SSE error (session ${sessionId}):`, err)
      delete sessions[sessionId]
    }

    req.on('close', () => {
      log(`Client disconnected (session ${sessionId})`)
      delete sessions[sessionId]
    })
  })

  // @ts-ignore: ignoring potential type mismatch from express
  app.post(messagePath, async (req, res) => {
    if (!transport) {
      throw new Error('');
    }
    transport.handlePostMessage(req, res);
    return;
    const sessionId = req.query.sessionId as string;
  
    if (!sessionId) {
      return res.status(400).send('Missing sessionId parameter');
    }
  
    const session = sessions[sessionId];
  
    if (session?.transport?.handlePostMessage) {
      log(`POST to SSE transport (session ${sessionId})`);
      try {
        await session.transport.handlePostMessage(req, res);
        // If handlePostMessage doesn't send a response, send one here
        if (!res.headersSent) {
          res.json({ status: 'success' });
        }
      } catch (error) {
        log(`Error handling POST message: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(503).send(`No active SSE connection for session ${sessionId}`);
    }
  });
  

  app.listen(port, () => {
    log(`Listening on port ${port}`)
    log(`SSE endpoint: http://localhost:${port}${ssePath}`)
    log(`POST messages: http://localhost:${port}${messagePath}`)
  }) 

  server.setRequestHandler(ListToolsRequestSchema, async (request) => {
    log('called list tools!');
    return { tools: [ ECHO_TOOL ] };
  });
}

const main = async () => {
  await MultiLevelSseServer(8080, '', '/sse', '/messages');
}

main().catch(err => {
  logStderr('Fatal error:', err)
  process.exit(1)
})
