import React from "react";
import { Grid } from "@mui/material";

interface ContainerRegisterFormProps {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
}

const ContainerFields: React.FC<ContainerRegisterFormProps> = ({
  leftChild,
  rightChild,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {leftChild}
      </Grid>
      <Grid item xs={12} md={6}>
        {rightChild}
      </Grid>
    </Grid>
  );
};

export default ContainerFields;
