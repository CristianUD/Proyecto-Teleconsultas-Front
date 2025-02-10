import React, { useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Button, TextField, MenuItem } from "@mui/material";

const initialAppointments = [
  { id: 1, fecha: "2025-02-10", hora: "10:00 AM", paciente: "Juan Pérez", estado: "Pendiente", link: "https://teleconsulta.com/123" },
  { id: 2, fecha: "2025-02-11", hora: "02:00 PM", paciente: "María Gómez", estado: "Confirmada", link: "https://teleconsulta.com/456" },
  { id: 3, fecha: "2025-02-12", hora: "04:30 PM", paciente: "Carlos López", estado: "Pendiente", link: "https://teleconsulta.com/789" }
];

const DoctorAppointments = () => {
  const [filter, setFilter] = useState("Todos");
  const [appointments, setAppointments] = useState(initialAppointments);

  const confirmAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, estado: "Confirmada" } : appointment
      )
    );
  };

  const filteredAppointments = filter === "Todos" ? appointments : appointments.filter(a => a.estado === filter);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Citas
      </Typography>
      <TextField
        select
        label="Filtrar por Estado"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      >
        <MenuItem value="Todos">Todos</MenuItem>
        <MenuItem value="Pendiente">Pendiente</MenuItem>
        <MenuItem value="Confirmada">Confirmada</MenuItem>
      </TextField>
      <Grid container spacing={3}>
        {filteredAppointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment.id}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {appointment.paciente}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha: {appointment.fecha}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hora: {appointment.hora}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estado: {appointment.estado}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={appointment.link}
                  target="_blank"
                  sx={{ mt: 2, width: "100%" }}
                >
                  Ver Detalles
                </Button>
                {appointment.estado === "Pendiente" && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => confirmAppointment(appointment.id)}
                    sx={{ mt: 1, width: "100%" }}
                  >
                    Confirmar Cita
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DoctorAppointments;
