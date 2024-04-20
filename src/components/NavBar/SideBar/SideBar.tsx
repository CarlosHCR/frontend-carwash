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
import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  HOME_ROUTE,
  SERVICES_CREATE_ROUTE,
  SERVICES_GET_ROUTE,
  SERVICES_TYPE_CREATE,
} from "routes/ConstantsURLRoutes";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  { text: "Home", href: HOME_ROUTE, icon: <HomeIcon /> },
  {
    text: "Serviços",
    href: "/",
    icon: <SavingsIcon />,
    subItems: [
      { text: "Cadastrar", href: SERVICES_CREATE_ROUTE, icon: <NoteAddIcon /> },
      { text: "Listar", href: SERVICES_GET_ROUTE, icon: <ListAltIcon /> },
      { text: "Tipo de serviço", href: SERVICES_TYPE_CREATE, icon: <NoteAddIcon /> },
      { text: "Editar", href: "/services/edit", icon: <EditIcon /> },
      { text: "Excluir", href: "/services/delete", icon: <DeleteIcon /> },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
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
