import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

interface SucessModalProps {
  message: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SucessModalProps> = ({
  message,
  onClose,
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
      <DialogTitle
        bgcolor={"#4caf50"}
        display={"flex"}
        justifyContent={"center"}
      >
        <CheckCircleOutlineRoundedIcon
          sx={{ color: "white", fontSize: "4rem" }}
        />
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
          Sucesso
        </Typography>
        <Typography
          variant="body2"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {message}
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
