import React from "react";
import { Grid, Paper } from "@mui/material";
import Logo from "assets/logo.jpg";

const ContainerPaper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Grid
      container
      bgcolor="#333"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight="100vh"
      style={{ padding: "0 16px" }}
    >
      <Grid item xs={12} sm={8} md={5} lg={4} xl={3} style={{ width: "100%" }}>
        <Paper
          elevation={3}
          style={{
            padding: 20,
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              maxWidth: "100%",
              maxHeight: "30vh",
              objectFit: "contain",
            }}
          />
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ContainerPaper;