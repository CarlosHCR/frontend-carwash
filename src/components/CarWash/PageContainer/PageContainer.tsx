import React from "react";
import { Grid, Paper } from "@mui/material";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ padding: "10px" }}
    >
      <Paper
        style={{
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        {children}
      </Paper>
    </Grid>
  );
};

export default PageContainer;
