import React from "react";
import { Grid } from "@mui/material";
import Logo from "assets/logo.jpg";
import styles from "styles/AuthPages/Register.module.css";

const ContainerRegisterImage: React.FC<{
  children?: React.ReactNode;
}> = () => {
  return (
    <Grid item xs={12} md={6} className={styles.containerImage}>
      <img src={Logo} alt="Logo" className={styles.image} />
    </Grid>
  );
};

export default ContainerRegisterImage;
