import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LogoutModal } from "components/Dialog/LogoutDialog";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isSidebarOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleEditProfile(): void {
    window.location.href = "/user";
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#333",
          marginBlockEnd: "2%",
        }}
      >
        <Toolbar>
          {!isSidebarOpen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEditProfile}>Editar Perfil</MenuItem>
            <MenuItem onClick={handleOpenLogoutModal}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {isLogoutModalOpen && <LogoutModal onClose={handleCloseLogoutModal} />}
    </>
  );
};
