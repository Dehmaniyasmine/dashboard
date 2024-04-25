import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { Box } from "@mui/system";

const WebSocketClient = () => {
  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:3000');



  return (
    <Box>
        {lastMessage ? lastMessage.data : 'No message received yet'}
    </Box>
  );
};

export default WebSocketClient;
