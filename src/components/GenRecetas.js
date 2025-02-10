import React from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const RegistroReceta = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card style={{ backgroundColor: "#e8f5e9", borderRadius: "12px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom style={{ color: "#2e7d32", fontWeight: "bold" }}>
            Generar Receta Médica
          </Typography>
          <TextField
            fullWidth
            label="Fecha de Emisión"
            type="date"
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            label="Indicaciones"
            multiline
            rows={3}
            variant="outlined"
            style={{ marginBottom: "15px" }}
          />
          <Typography variant="h6" gutterBottom style={{ color: "#388e3c" }}>Agregar Medicamentos</Typography>
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <TextField label="Nombre" variant="outlined" fullWidth />
            <TextField label="Descripción" variant="outlined" fullWidth />
            <TextField label="Dosis" variant="outlined" fullWidth />
          </div>
          <Button variant="contained" style={{ backgroundColor: "#4caf50", color: "#fff" }}>
            Agregar
          </Button>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#a5d6a7" }}>
                <TableRow>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Descripción</strong></TableCell>
                  <TableCell><strong>Dosis</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Ejemplo</TableCell>
                  <TableCell>Descripción ejemplo</TableCell>
                  <TableCell>Dosis ejemplo</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" style={{ backgroundColor: "#2e7d32", color: "#fff", marginTop: "20px" }}>
            Generar Receta
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistroReceta;
