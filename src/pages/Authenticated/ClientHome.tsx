import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { getLastService } from "services/carwashService.service";
import { formatDateAndTimeBR, formatToBRL } from "utils/Formats";
import {
  SERVICES_CREATE_ROUTE,
  SERVICES_GET_ROUTE,
} from "routes/ConstantsURLRoutes";
import { CardsHomepage } from "components/UserPages/Home/Cards";
import { LastServiceCard } from "components/UserPages/Home/LastServiceCards";
import { getUser } from "auth/tokenService";

interface LastService {
  service_date: string;
  service_time: string;
  service_type_name: string;
  service_price: string;
  service_status: string;
}

const UserPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const username = getUser()?.username;
  const [lastService, setLastService] = useState<LastService | null>({
    service_date: "",
    service_time: "",
    service_type_name: "",
    service_price: "",
    service_status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLastService();
        const { date, time } = formatDateAndTimeBR(result.service_date);
        const price = formatToBRL(result.price);
        const mappedService: LastService = {
          service_date: date,
          service_time: time,
          service_type_name: result.service_type.name,
          service_price: price,
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

  return (
    <Container>
      <Typography variant="h4">Olá, {username}!</Typography>
      <Grid container spacing={4} justifyContent="center">
        {isLoading ? (
          <Typography variant="body1">
            <CircularProgress />
            Carregando...
          </Typography>
        ) : lastService ? (
          <LastServiceCard lastService={lastService} />
        ) : (
          <CardsHomepage
            title="Último serviço realizado"
            text="Você ainda não realizou nenhum serviço. Agende agora mesmo e aproveite nossos serviços."
            buttonText="Agendar serviço"
            route={SERVICES_CREATE_ROUTE}
          />
        )}
        <CardsHomepage
          title="Agende seu próximo horário"
          text="Agende com facilidade e praticidade, diretamente pelo site."
          buttonText="Agendar serviço"
          route={SERVICES_CREATE_ROUTE}
        />
        <CardsHomepage
          title="Meus Serviços"
          text="Visualize todos os serviços e informações relacionadas em um só lugar."
          buttonText="Visualizar"
          route={SERVICES_GET_ROUTE}
        />
        <CardsHomepage
          title="Informações Adicionais"
          text="Explore mais informações úteis sobre nossos serviços e como eles podem te ajudar no dia a dia."
          buttonText="Saiba mais"
          route="/services"
        />
      </Grid>
    </Container>
  );
};

export default UserPage;
