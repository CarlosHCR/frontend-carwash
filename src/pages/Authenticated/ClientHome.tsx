import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { getLastService } from "services/carwashService.service";
import { formatDateAndTimeBR, formatToBRL } from "utils/Formats";
import {
  SERVICES_CREATE_ROUTE,
  SERVICES_GET_ROUTE,
} from "routes/ConstantsURLRoutes";
import { useNavigate } from "react-router-dom";

interface LastService {
  service_date: string;
  service_time: string;
  service_type_name: string;
  service_type_price: number;
  service_status: string;
}

const UserPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userString = sessionStorage.getItem("user");
  const username = userString
    ? JSON.parse(userString).first_name
    : "Seja bem-vindo";
  const [lastService, setLastService] = useState<LastService | null>({
    service_date: "",
    service_time: "",
    service_type_name: "",
    service_type_price: 0,
    service_status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLastService();
        const { date, time } = formatDateAndTimeBR(result.service_date);
        const mappedService: LastService = {
          service_date: date,
          service_time: time,
          service_type_name: result.service_type.name,
          service_type_price: result.service_type.price,
          service_status: result.status,
        };
        setLastService(mappedService);
      } catch (error: any) {
        setLastService(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const cardStyle = {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardActionStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        Olá, {username}!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ background: "#FFD180", ...cardStyle }}>
            <CardContent>
              <Typography variant="h6">Último serviço realizado</Typography>

              {isLoading ? (
                <Typography variant="body1">
                  <CircularProgress />
                  Carregando...
                </Typography>
              ) : lastService ? (
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
                      <strong>Preço:</strong>{" "}
                      {formatToBRL(lastService.service_type_price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Status:</strong> {lastService.service_status}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body1">
                  Você ainda não possui nenhum serviço realizado.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ background: "#FFAB91", ...cardStyle }}>
            <CardContent>
              <Typography variant="h6">Agende seu próximo horário!</Typography>
              <Typography variant="body1">
                Agende com facilidade e praticidade, diretamente pelo site.
              </Typography>
            </CardContent>
            <CardActions sx={{ ...cardActionStyle }}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => {
                  navigate(SERVICES_CREATE_ROUTE);
                }}
              >
                Agendar serviço
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ background: "#A5D6A7", ...cardStyle }}>
            <CardContent>
              <Typography variant="h6">Meus Serviços</Typography>
              <Typography variant="body1">
                Visualize todos os serviços e informações relacionadas em um só
                lugar.
              </Typography>
            </CardContent>
            <CardActions sx={{ ...cardActionStyle }}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => {
                  navigate(SERVICES_GET_ROUTE);
                }}
              >
                Visualizar serviços
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ background: "#FFF59D", ...cardStyle }}>
            <CardContent>
              <Typography variant="h6">Informações Adicionais</Typography>
              <Typography variant="body1">
                Explore mais informações úteis sobre nossos serviços e como eles
                podem te ajudar no dia a dia.
              </Typography>
            </CardContent>
            <CardActions sx={{ ...cardActionStyle }}>
              <Button variant="contained" size="medium">
                Saiba mais
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
