import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "styles/UserPages/Homepage.module.css";

interface CardsHomepageProps {
  title: string;
  text: string;
  buttonText?: string | null;
  route: string;
}

export const CardsHomepage: React.FC<CardsHomepageProps> = ({
  title,
  text,
  buttonText,
  route,
}) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={6}>
      <Card elevation={3} className={styles.cardStyle}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{text}</Typography>
        </CardContent>
        {buttonText && (
          <CardActions className={styles.cardActionStyle}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                navigate(route);
              }}
            >
              {buttonText}
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};
