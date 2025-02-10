import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";

export default function HomePage() {
  return (
    <>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#4CAF50",
          color: "white",
          textAlign: "center",
          py: 8,
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Bienvenido a Aliansalud
          </Typography>
          <Typography variant="h6">
            Tu salud en buenas manos. Accede a nuestros servicios en línea de
            manera rápida y segura.
          </Typography>
          <Button variant="contained" sx={{ mt: 3, backgroundColor: "#1B5E20" }}>
            Conoce más
          </Button>
        </Container>
      </Box>

      {/* Secciones principales */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Agendamiento de Citas */}
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3, backgroundColor: "#E8F5E9" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Agendamiento de Citas
                </Typography>
                <Typography color="textSecondary">
                  Reserva tu cita médica con el especialista que necesites en
                  pocos pasos.
                </Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: "#1B5E20" }}>
                  Agendar Cita
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Visualización de Recetas Médicas */}
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3, backgroundColor: "#E8F5E9" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Recetas Médicas
                </Typography>
                <Typography color="textSecondary">
                  Consulta y descarga tus recetas médicas desde cualquier lugar.
                </Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: "#1B5E20" }}>
                  Ver Recetas
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Historia Médica */}
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 3, backgroundColor: "#E8F5E9" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Historia Médica
                </Typography>
                <Typography color="textSecondary">
                  Accede a tu historial médico con información detallada de
                  consultas y tratamientos.
                </Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: "#1B5E20" }}>
                  Ver Historia Médica
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonios */}
      <Box sx={{ backgroundColor: "#E8F5E9", py: 6, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Lo que dicen nuestros pacientes
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            "Gracias a Aliansalud pude agendar mis citas sin complicaciones y recibir la mejor atención médica."
          </Typography>
          <Typography variant="body2">- Juan Pérez</Typography>
        </Container>
      </Box>
    </>
  );
}
