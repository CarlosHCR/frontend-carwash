import React from "react";
import {
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
  menuItems: {
    text: string;
    icon: React.ReactNode;
    href: string;
    subItems?: {
      text: string;
      icon: React.ReactNode;
      href: string;
    }[];
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  toggleSidebar,
  menuItems,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const drawerVariant = isMobile ? "temporary" : "persistent";
  const drawerWidth = isMobile ? "80%" : isTablet ? "180px" : "200px";
  const navigate = useNavigate();

  const [openSubMenus, setOpenSubMenus] = React.useState<
    Record<string, boolean>
  >({});

  const handleToggleSubMenu = (text: string) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [text]: !prevOpenSubMenus[text],
    }));
  };

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      handleToggleSubMenu(item.text);
    } else {
      handleNavigation(item.href);
    }
  };

  return (
    <Drawer
      variant={drawerVariant}
      open={open}
      onClose={toggleSidebar}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: open ? "block" : "none",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#333",
        },
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        sx={{
          color: "#fff",
        }}
      >
        <MenuIcon />
      </IconButton>

      <List
        sx={{
          color: "#fff",
        }}
      >
        {menuItems.map((item) => (
          <div key={item.text}>
            <ListItem button onClick={() => handleItemClick(item)}>
              <ListItemIcon
                sx={{
                  color: "#fff",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subItems ? (
                openSubMenus[item.text] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {item.subItems && (
              <Collapse
                in={openSubMenus[item.text]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      sx={{ pl: 4 }}
                      onClick={() => handleNavigation(subItem.href)}
                    >
                      <ListItemIcon
                        sx={{
                          color: "#fff",
                        }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
};
