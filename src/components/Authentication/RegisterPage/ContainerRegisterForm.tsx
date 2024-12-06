import React from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import styles from "styles/AuthPages/Register.module.css";

const ContainerRegisterForm: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <Grid item xs={12} md={6} className={styles.containerForm}>
      <Box className={styles.boxForm}>
        <Paper elevation={3} className={styles.paperForm}>
          <Typography variant="h4">Cadastro</Typography>
          <Typography variant="body2" style={{ marginBottom: 20 }}>
            Realize cadastro para acessar o sistema
          </Typography>
          {children}
        </Paper>
      </Box>
    </Grid>
  );
};

export default ContainerRegisterForm;
