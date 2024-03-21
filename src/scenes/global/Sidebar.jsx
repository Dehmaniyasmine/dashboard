import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Administration
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="Admin Profile Picture"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Khedhr karawita
                </Typography>
                <Typography variant="h6" color={colors.blueAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <MenuItem
              component={<Link to="/"/>}
              icon={<HomeOutlinedIcon />}
            >
              Home Page
            </MenuItem>

            {!isCollapsed && (
              <Typography
                variant="h3"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Manage Team
              </Typography>)}
            <MenuItem
              component={<Link to="/addMember" />}
              icon={<PersonAddAltOutlinedIcon />}
            >
              Add member
            </MenuItem>
            <MenuItem
              component={<Link to="/removeMember" />}
              icon={<PersonRemoveAlt1OutlinedIcon />}
            >
              Remove member
            </MenuItem>
            <MenuItem
              component={<Link to="/updateAccess" />}
              icon={<UpdateOutlinedIcon />}
            >
              Update access
            </MenuItem>

            {!isCollapsed && (
              <Typography
                variant="h3"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Manage Center
              </Typography>)}
            <MenuItem
              component={<Link to="/viewCenter" />}
              icon={<VisibilityOutlinedIcon />}
            >
              View center
            </MenuItem>
            <MenuItem
              component={<Link to="/viewTeam" />}
              icon={<Groups2OutlinedIcon />}
            >
              View Team
            </MenuItem>
            <MenuItem
                icon = {<LogoutIcon />}
            >
                Logout
            </MenuItem>
            
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;