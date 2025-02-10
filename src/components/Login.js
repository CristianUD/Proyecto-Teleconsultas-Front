import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      const response = await fetch("http://localhost:4000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en la autenticación");
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Redirigir al usuario a la página principal
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
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
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Iniciar Sesión
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            sx={{ bgcolor: "white", borderRadius: 1 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ bgcolor: "white", borderRadius: 1 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
          >
            Iniciar Sesión
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            ¿No tienes una cuenta?{" "}
            <Link
              href="#"
              underline="hover"
              onClick={() => navigate("/Register")}
            >
              Regístrate
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
