import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "success.main" }} />
        <Typography variant="h3" color="success.main" gutterBottom>
          404 - Página no encontrada
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          No has iniciado sesión. Por favor, inicia sesión para continuar.
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/Login")}
        >
          Ir a Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
}
