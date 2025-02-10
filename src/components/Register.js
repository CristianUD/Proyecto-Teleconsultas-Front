import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  MenuItem,
  Grid,
  Link,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    numDoc: "",
    tDoc: "",
    email: "",
    name: "",
    password: "",
    rol: "Paciente",
    celphone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Error en la solicitud");
      const data = await res.json();
      navigate("/Login");
      console.log(data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Registro
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                name="numDoc"
                label="Número de Documento"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="tDoc"
                label="Tipo"
                select
                variant="outlined"
                fullWidth
                onChange={handleChange}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              >
                <MenuItem value="CC">CC</MenuItem>
                <MenuItem value="TI">TI</MenuItem>
                <MenuItem value="RC">RC</MenuItem>
                <MenuItem value="PP">PP</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <TextField
            name="email"
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            name="name"
            label="Nombre Completo"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            name="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            name="celphone"
            label="Teléfono"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            name="address"
            label="Dirección"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
          >
            Registrarse
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            ¿Ya tienes una cuenta?{" "}
            <Link
              component="button"
              underline="hover"
              onClick={() => navigate("/Login")}
            >
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
