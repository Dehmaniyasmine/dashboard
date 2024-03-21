import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const Dashboard = () => {
    const theme = useTheme(); 
    const colors = tokens(theme.palette.mode);

};
export default Dashboard;
