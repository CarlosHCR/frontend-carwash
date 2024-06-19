import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  HOME_ROUTE,
  SERVICES_CREATE_ROUTE,
  SERVICES_GET_ROUTE,
  STAFF_HOME_ROUTE,
  STAFF_SERVICES_CREATE_ROUTE,
  STAFF_SERVICES_TYPE_CREATE_ROUTE,
} from "routes/ConstantsURLRoutes";
import {
  authProvider,
  isUserRoleStaff,
  isUserRoleClient,
} from "auth/tokenService";
import { AUTHENTICATION_ERROR_MESSAGE } from "validations/messages/Authentication";

const StaffMenuItems = [
  { text: "Home", href: STAFF_HOME_ROUTE, icon: <HomeIcon /> },
  {
    text: "Serviços",
    href: "/",
    icon: <SavingsIcon />,
    subItems: [
      {
        text: "Cadastrar",
        href: STAFF_SERVICES_CREATE_ROUTE,
        icon: <NoteAddIcon />,
      },
      { text: "Listar", href: SERVICES_GET_ROUTE, icon: <ListAltIcon /> },
      {
        text: "Tipo de serviço",
        href: STAFF_SERVICES_TYPE_CREATE_ROUTE,
        icon: <NoteAddIcon />,
      },
      { text: "Editar", href: "/services/edit", icon: <EditIcon /> },
      { text: "Excluir", href: "/services/delete", icon: <DeleteIcon /> },
    ],
  },
];

const ClientMenuItems = [
  { text: "Home", href: HOME_ROUTE, icon: <HomeIcon /> },
  {
    text: "Serviços",
    href: "/",
    icon: <SavingsIcon />,
    subItems: [
      {
        text: "Cadastrar",
        href: SERVICES_CREATE_ROUTE,
        icon: <NoteAddIcon />,
      },
      {
        text: "Listar",
        href: SERVICES_GET_ROUTE,
        icon: <ListAltIcon />,
      },
    ],
  },
];

export const MenuItemsByRole = () => {
  try {
    const isAuthenticated = authProvider();

    if (!isAuthenticated) {
      throw new Error(AUTHENTICATION_ERROR_MESSAGE);
    }

    const isStaff = isUserRoleStaff();

    if (isStaff) {
      return StaffMenuItems;
    }

    const isUser = isUserRoleClient();

    if (isUser) {
      return ClientMenuItems;
    }

    throw new Error(AUTHENTICATION_ERROR_MESSAGE);
  } catch (error) {
    throw error;
  }
};
