import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Navbar } from "./Header";
import { Sidebar } from "./SideBar";
import { MenuItemsByRole } from "./MenuItemsByRole";
import { ErrorModal } from "components/Dialog";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";

export const LayoutNavBar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  interface MenuItem {
    text: string;
    href: string;
    icon: JSX.Element;
    subItems?: MenuItem[];
  }

  useEffect(() => {
    const fetchMenuItems = () => {
      try {
        const items = MenuItemsByRole();
        setMenuItems(items);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchMenuItems();
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {!error ? (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Sidebar
            open={sidebarOpen}
            toggleSidebar={handleToggleSidebar}
            menuItems={menuItems}
          />
          <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
            <Navbar
              toggleSidebar={handleToggleSidebar}
              isSidebarOpen={sidebarOpen}
            />
            {children}
          </Box>
        </Box>
      ) : (
        <ErrorModal
          errorMessage={error}
          onClose={() => {
            navigate(LOGIN_ROUTE);
          }}
        />
      )}
    </>
  );
};
