import asyncio
import logging
from mcp import ClientSession
from mcp.client.sse import sse_client

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def main():
    try:
        logger.info("Attempting to connect to SSE...")
        async with sse_client("http://localhost:3001/sse") as streams:
            logger.info("SSE connection established successfully.")
            
            logger.info("Initializing ClientSession...")
            async with ClientSession(streams[0], streams[1]) as session:
                await session.initialize()
                logger.info("ClientSession initialized successfully.")
                
                # You can add more operations here to interact with the session
                # For example:
                # result = await session.some_method()
                # logger.info(f"Result: {result}")
                
                # Keep the connection alive for a while
                await asyncio.sleep(5)
                
            logger.info("ClientSession closed.")
        logger.info("SSE connection closed.")
    except Exception as e:
        logger.error(f"An error occurred: {e}")

if __name__ == "__main__":
    logger.info("Starting the client...")
    asyncio.run(main())
    logger.info("Client execution completed.")
