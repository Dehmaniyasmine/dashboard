import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/header";
import { Box } from "@mui/system";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Header title="Home Page" subtitle="Welcome!" />
    </Box>
  );
};
export default Dashboard;
