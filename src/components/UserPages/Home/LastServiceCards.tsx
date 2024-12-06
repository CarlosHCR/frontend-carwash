import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import styles from "styles/UserPages/Homepage.module.css";

interface LastServiceCardProps {
  lastService: {
    service_type_name: string;
    service_date: string;
    service_time: string;
    service_price: string;
    service_status: string;
  };
}

export const LastServiceCard: React.FC<LastServiceCardProps> = ({
  lastService,
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Card elevation={3} className={styles.cardStyle}>
        <CardContent>
          <Typography variant="h6">Último serviço realizado</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{lastService.service_type_name}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Data:</strong> {lastService.service_date}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Hora:</strong> {lastService.service_time}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Preço:</strong> {lastService.service_price}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Status:</strong> {lastService.service_status}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
