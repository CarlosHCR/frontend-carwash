import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EditServiceDialog = ({
  open,
  service,
  onClose,
  onSave,
  onChange,
}: {
  open: boolean;
  service: any;
  onClose: () => void;
  onSave: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Service</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Price"
          type="text"
          fullWidth
          name="price"
          value={service?.price || ""}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditServiceDialog;
