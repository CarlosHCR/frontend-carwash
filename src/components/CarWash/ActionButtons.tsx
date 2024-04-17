import React from "react";
import { Button, Tooltip } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import GridDeleteIcon from "@mui/icons-material/Delete";

interface ActionButtonsProps {
  onAdd: (newServiceName: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  isOptionSelected: boolean;
}
const ActionButtons = ({
  onAdd,
  onEdit,
  onDelete,
  isOptionSelected,
}: ActionButtonsProps) => {
  const handleAdd = () => {
    const newServiceName = prompt("Nome do novo serviço:");
    if (newServiceName) {
      console.log("Add button clicked");
      onAdd(newServiceName);
    }
  };
  return (
    <div>
      <Button onClick={handleAdd}>
        <Tooltip title="Criar tipo de serviço">
          <AddCircleOutlinedIcon />
        </Tooltip>
      </Button>
      <Tooltip title="Editar tipo de serviço selecionado">
        <span>
          <Button onClick={onEdit} disabled={!isOptionSelected}>
            <EditIcon />
          </Button>
        </span>
      </Tooltip>
      <Tooltip title="Excluir tipo de serviço selecionado">
        <span>
          <Button onClick={onDelete} disabled={!isOptionSelected}>
            <GridDeleteIcon />
          </Button>
        </span>
      </Tooltip>
    </div>
  );
};

export default ActionButtons;
