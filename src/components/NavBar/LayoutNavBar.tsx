import React, { useState } from "react";
import { Box } from "@mui/material";
import { Navbar } from "./Header";
import { Sidebar } from "./SideBar";

export const LayoutNavBar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar open={sidebarOpen} toggleSidebar={handleToggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        <Navbar
          toggleSidebar={handleToggleSidebar}
          isSidebarOpen={sidebarOpen}
        />
        {children}
      </Box>
    </Box>
  );
};
