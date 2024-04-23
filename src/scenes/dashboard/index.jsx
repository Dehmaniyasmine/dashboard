import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";
import Item from "../../components/item";
import BarChart from "../../components/bar";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("/fetchLogs");
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };
  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Header title="Home Page" subtitle="Welcome back!" />
      <Box display="flex" flexDirection="row" justifyContent={"space-bewtween"}>
        <Box
          display="flex"
          flexDirection="row"
          backgroundColor={colors.primary[400]}
          sx={{ borderRadius: 5, p: 2 }}
          width="30%"
        >
          <Box>
            <Item title="Network Health" subtitle="Check the network status" />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="30%"
          marginLeft={5}
          marginRight={5}
          justifyContent={"space-between"}
        >
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor={colors.primary[400]}
            sx={{ borderRadius: 5, p: 2, maxHeight: "34vh" }}
          >
            <Item
              title="Employee Activity"
              subtitle="Viewing last 7 days activity"
            />
            <BarChart />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor={colors.primary[400]}
            sx={{ borderRadius: 5, p: 2, maxHeight: "34vh"}}
          ></Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: 5,
            p: 2,
            maxHeight: "70vh",
            overflowY: "auto",
            position: "relative",
            width: "30%",
          }}
        >
          <Box sx={{ position: "sticky", top: "0", zIndex: 1 }}>
            <Item title="Recent logins" subtitle="" />
          </Box>
          <Box borderRadius={2} p={1} sx={{ overflowY: "auto", flexGrow: 1 }}>
            {logs.map((log) => (
              <Card
                key={log._id}
                variant="outlined"
                sx={{ marginBottom: 2, position: "relative" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {`${log.firstName} ${log.lastName} `}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Has accessed the {`${log.department}`} department
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
