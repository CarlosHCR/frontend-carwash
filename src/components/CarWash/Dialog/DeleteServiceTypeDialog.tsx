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
import { deleteServiceType } from "services/carwashService.service";

interface DeleteServiceTypeModalProps {
  onClose: (data: { error?: any; confirmDelete?: boolean }) => void;
  ServiceTypeId: number;
  open: boolean;
}

export const DeleteServiceTypeModal: React.FC<DeleteServiceTypeModalProps> = ({
  onClose,
  ServiceTypeId,
  open,
}) => {

  const handleClose = () => {
    onClose({});
  };

 const handleConfirm = async () => {
   try {
     await deleteServiceType(ServiceTypeId);
     onClose({ confirmDelete: true }); 
   } catch (error: any) {
     onClose({ error });
   }
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
          Tem certeza que deseja excluir tipo de serviço?
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
