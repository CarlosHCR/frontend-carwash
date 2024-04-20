import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorModalProps {
  errorMessage: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onClose }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
      <DialogTitle
        bgcolor={"#e95f6b"}
        display={"flex"}
        justifyContent={"center"}
      >
        <ErrorOutlineIcon sx={{ color: "white", fontSize: "4rem" }} />
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
          Erro
        </Typography>
        <Typography
          variant="body2"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {errorMessage}
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
        <Button onClick={handleClose} variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

