import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";

const WebSocketClient = () => {
  const [activeClients, setActiveClients] = useState(null);
  const [maxClients, setMaxClients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const { lastMessage } = useWebSocket("ws://localhost:3000");

  useEffect(() => {
    if (lastMessage) {
      const message = JSON.parse(lastMessage.data);
      if (message.topic === "$SYS/broker/clients/active") {
        setActiveClients(message.message);
      } else if (message.topic === "$SYS/broker/clients/maximum") {
        setMaxClients(message.message);
      }
    }
  }, [lastMessage]);

  const networkHealthCheck = () => {
    if (activeClients !== null && maxClients !== null) {
      if (activeClients < maxClients) {
        return "Issue detected";
      } else {
        return "Network is healthy";
      }
    } else {
      return "Loading...";
    }
  };

  const handleDiagnosticRun = async () => {
    setLoading(true); // Show loading icon on button
    try {
      const response = await axios.post("/pingIPs");
      setDiagnosticResult(response.data); // Set diagnostic result
      setDialogOpen(true); // Open dialog to display result
    } catch (error) {
      console.error("Error running diagnostic:", error);
      // Handle error, show notification, etc.
    } finally {
      setLoading(false); // Hide loading icon on button
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width="100%"
      height="100%"
    >
      <Box display="flex" flexDirection="column">
        <Box>
          Connected Devices:{" "}
          {activeClients !== null ? activeClients - 1 : "Loading..."}
        </Box>
        <Box>
          Total Devices: {maxClients !== null ? maxClients - 1 : "Loading..."}
        </Box>
        <Box>{networkHealthCheck()}</Box>
      </Box>
      <Box>
        {networkHealthCheck() === "Issue detected" && (
          <Box marginTop={2} display="flex" flexDirection="row-reverse">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDiagnosticRun}
              disabled={loading} 
              style={{ position: "relative" }} 
            >
              {loading && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress size={24} color="inherit" />
                </span>
              )}
              Run Diagnostic
            </Button>
          </Box>
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Diagnostic Result</DialogTitle>
        <DialogContent>
          {diagnosticResult && (
            <Box>
              <Box>Non-Responsive IPs:</Box>
              <ul>
                {diagnosticResult.nonResponsiveIPs.map((ip, index) => (
                  <li key={index}>{ip}</li>
                ))}
              </ul>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WebSocketClient;
