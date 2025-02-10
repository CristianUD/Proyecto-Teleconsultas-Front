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
  
  export default function DoctorsPage() {
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
              Panel de Doctores
            </Typography>
            <Typography variant="h6">
              Administra tus pacientes y gestiona citas de manera eficiente.
            </Typography>
            <Button variant="contained" sx={{ mt: 3, backgroundColor: "#1B5E20" }}>
              Explorar Herramientas
            </Button>
          </Container>
        </Box>
  
        {/* Secciones principales */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {/* Gestión de Citas */}
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center", p: 3, backgroundColor: "#E8F5E9" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Gestión de Citas
                  </Typography>
                  <Typography color="textSecondary">
                    Administra y organiza las citas de tus pacientes de manera efectiva.
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: "#1B5E20" }}>
                    Ver Citas
                  </Button>
                </CardContent>
              </Card>
            </Grid>
  
            {/* Historial de Pacientes */}
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center", p: 3, backgroundColor: "#E8F5E9" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Historial de Pacientes
                  </Typography>
                  <Typography color="textSecondary">
                    Accede a los expedientes médicos y seguimiento de tratamientos.
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: "#1B5E20" }}>
                    Ver Historial
                  </Button>
                </CardContent>
              </Card>
            </Grid>
  
            {/* Recetas Médicas */}
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center", p: 3, backgroundColor: "#E8F5E9" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Recetas Médicas
                  </Typography>
                  <Typography color="textSecondary">
                    Genera y revisa recetas médicas para tus pacientes.
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: "#1B5E20" }}>
                    Ver Recetas
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
              Opiniones de Médicos
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              "El panel de Aliansalud me ha permitido mejorar la gestión de mis pacientes y optimizar mi tiempo."
            </Typography>
            <Typography variant="body2">- Dra. Fernández</Typography>
          </Container>
        </Box>
      </>
    );
  }
  