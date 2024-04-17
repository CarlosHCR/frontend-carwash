import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { clearUserSessionStorage } from "auth/tokenService";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";

interface LogoutModalProps {
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    clearUserSessionStorage();
    navigate(LOGIN_ROUTE);

    onClose();
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
      <DialogTitle
        bgcolor={"#ff9800"}
        display={"flex"}
        justifyContent={"center"}
      >
        <ReportProblemOutlinedIcon sx={{ color: "white", fontSize: "4rem" }} />
      </DialogTitle>
      <DialogContent sx={{ color: "black" }}>
        <Typography
          variant="h4"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          fontStyle={"bold"}
          padding={2}
        >
          Aviso
        </Typography>
        <Typography
          variant="body2"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          Tem certeza que deseja sair?
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
