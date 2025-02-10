import React from "react";
import { TextField, Button, Container, Typography, Box, Paper, MenuItem } from "@mui/material";

const ScheduleAppointment = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: "center", backgroundColor: "#f9f9f9", width: "100%" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Agendar Cita
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Estado" select variant="outlined" fullWidth sx={{ bgcolor: "white", borderRadius: 1 }}>
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Confirmada">Confirmada</MenuItem>
            <MenuItem value="Cancelada">Cancelada</MenuItem>
          </TextField>
          <TextField label="Fecha" type="date" variant="outlined" fullWidth sx={{ bgcolor: "white", borderRadius: 1 }} InputLabelProps={{ shrink: true }} />
          <TextField label="Hora" type="time" variant="outlined" fullWidth sx={{ bgcolor: "white", borderRadius: 1 }} InputLabelProps={{ shrink: true }} />
          <TextField label="Link de Teleconsulta" type="url" variant="outlined" fullWidth sx={{ bgcolor: "white", borderRadius: 1 }} />
          <TextField label="ID del Paciente" type="text" variant="outlined" fullWidth sx={{ bgcolor: "white", borderRadius: 1, readOnly: true  }}/>
          <TextField label="Tipo de Especialista" select variant="outlined" fullWidth sx={{ bgcolor: "white", borderRadius: 1}}>
            <MenuItem value="1">General</MenuItem>
            <MenuItem value="2">Otorrino</MenuItem>
            <MenuItem value="3">Odontologia</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}>
            Buscar disponibilidad
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ScheduleAppointment;
