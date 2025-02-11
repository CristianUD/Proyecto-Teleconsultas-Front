import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, Button, TextField, MenuItem } from "@mui/material";
import axios from 'axios';

const DoctorAppointments = () => {
  const [filter, setFilter] = useState("Todos");
  const [appointments, setAppointments] = useState([]);
  const [linkConsulta, setLinkConsulta] = useState(""); // Estado para el link de la consulta
  const [citaSeleccionada, setCitaSeleccionada] = useState(null); // Estado para la cita seleccionada

  // Obtener las citas al cargar el componente
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Función para actualizar el estado de la cita
  const confirmAppointment = async (id, currentStatus) => {
    let newStatus;
    if (currentStatus === "Pendiente") {
      newStatus = "Confirmada";
    } else if (currentStatus === "Confirmada") {
      newStatus = "Cancelada";
    } else {
      newStatus = "Pendiente";
    }

    try {
      // Enviar la solicitud al backend para actualizar el estado
      const response = await axios.put(`http://localhost:4000/api/appointments/${id}/status`, {
        newStatus,
      });

      // Actualizar el estado local de la cita
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.citaid === id ? { ...appointment, estado: newStatus } : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  // Función para guardar el link de la consulta
  const guardarLinkConsulta = async (id) => {
    try {
      // Enviar la solicitud al backend para actualizar el link de la consulta
      const response = await axios.put(`http://localhost:4000/api/appointments/${id}/link`, {
        linkteleconsulta: linkConsulta,
      });

      // Actualizar el estado local de la cita
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.citaid === id ? { ...appointment, linkteleconsulta: linkConsulta } : appointment
        )
      );

      // Limpiar el campo de entrada
      setLinkConsulta("");
      setCitaSeleccionada(null);
      alert("Link de consulta guardado exitosamente");
    } catch (error) {
      console.error("Error updating link:", error);
      alert("Error al guardar el link de consulta");
    }
  };

  // Filtrar las citas según el estado seleccionado
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
        <MenuItem value="Cancelada">Cancelada</MenuItem>
      </TextField>
      <Grid container spacing={3}>
        {filteredAppointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment.citaid}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Paciente: {appointment.nombre_paciente}
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
                  href={appointment.linkteleconsulta}
                  target="_blank"
                  sx={{ mt: 2, width: "100%" }}
                >
                  Ver Detalles
                </Button>
                {/* Botón para cambiar el estado de la cita */}
                {appointment.estado === "Pendiente" && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => confirmAppointment(appointment.citaid, appointment.estado)}
                    sx={{ mt: 1, width: "100%" }}
                  >
                    Confirmar Cita
                  </Button>
                )}
                {appointment.estado === "Confirmada" && (
                  <>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => confirmAppointment(appointment.citaid, appointment.estado)}
                      sx={{ mt: 1, width: "100%" }}
                    >
                      Cancelar Cita
                    </Button>
                    {/* Contenedor para añadir el link de la consulta */}
                    {citaSeleccionada === appointment.citaid ? (
                      <>
                        <TextField
                          fullWidth
                          label="Link de la consulta"
                          value={linkConsulta}
                          onChange={(e) => setLinkConsulta(e.target.value)}
                          sx={{ mt: 2 }}
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => guardarLinkConsulta(appointment.citaid)}
                          sx={{ mt: 1, width: "100%" }}
                        >
                          Guardar Link Consulta
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => setCitaSeleccionada(appointment.citaid)}
                        sx={{ mt: 1, width: "100%" }}
                      >
                        Añadir Link Consulta
                      </Button>
                    )}
                  </>
                )}
                {appointment.estado === "Cancelada" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => confirmAppointment(appointment.citaid, appointment.estado)}
                    sx={{ mt: 1, width: "100%" }}
                  >
                    Reagendar Cita
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