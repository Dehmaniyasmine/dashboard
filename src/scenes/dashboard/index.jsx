import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const Dashboard = () => {
    const theme = useTheme(); 
    const colors = tokens(theme.palette.mode);
    return (
        <div>
        <h1>Dashboard</h1>
        </div>
    );
};
export default Dashboard;
