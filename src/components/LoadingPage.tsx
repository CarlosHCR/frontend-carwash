import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ textAlign: "center" }}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" marginTop={2}>
        Carregando...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
