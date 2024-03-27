import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import AddMember from "./scenes/addMember";
import RemoveMember from "./scenes/removeMember";
import UpdateAccess from "./scenes/updateAccess";
import ViewCenter from "./scenes/viewCenter";
import ViewTeam from "./scenes/viewTeam";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addMember" element={<AddMember />} />
              <Route path="/removeMember" element={<RemoveMember />} />
              <Route path="/updateAccess" element={<UpdateAccess />} />
              <Route path="/viewCenter" element={<ViewCenter />} />
              <Route path="/viewTeam" element={<ViewTeam />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
