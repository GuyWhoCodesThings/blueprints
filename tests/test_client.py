import asyncio
import unittest
from unittest.mock import patch, AsyncMock
from mcp import ClientSession
from mcp.client.sse import sse_client
from test_config import SSE_ENDPOINT  # Import the shared variable

async def test_client_connection(self, mock_client_session, mock_sse_client):
    # Mock the SSE client
    mock_streams = (AsyncMock(), AsyncMock())
    mock_sse_client.return_value.__aenter__.return_value = mock_streams

    # Mock the ClientSession
    mock_session = AsyncMock()
    mock_client_session.return_value.__aenter__.return_value = mock_session

    # The main function to test
    async def main():
        async with sse_client(SSE_ENDPOINT) as streams:
            async with ClientSession(streams[0], streams[1]) as session:
                await session.initialize()

    # Run the main function
    await main()

    # Assertions
    mock_sse_client.assert_called_once_with(SSE_ENDPOINT)
    mock_client_session.assert_called_once_with(mock_streams[0], mock_streams[1])
    mock_session.initialize.assert_called_once()


if __name__ == '__main__':
    unittest.main()

