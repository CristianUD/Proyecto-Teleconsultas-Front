import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const RegistroReceta = () => {
  // Estados para los datos del formulario
  const [fechaEmision, setFechaEmision] = useState("");
  const [indicaciones, setIndicaciones] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [consultas, setConsultas] = useState([]); // Lista de consultas relacionadas al usuario
  const [consultaSeleccionada, setConsultaSeleccionada] = useState("");
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState("");
  const [medicamentos, setMedicamentos] = useState([]); // Lista de medicamentos
  const [descripcionMedicamento, setDescripcionMedicamento] = useState("");
  const [dosisMedicamento, setDosisMedicamento] = useState("");
  const [medicamentosAgregados, setMedicamentosAgregados] = useState([]); // Medicamentos agregados a la tabla

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Obtener la lista de consultas cuando se selecciona un usuario
  useEffect(() => {
    const fetchConsultas = async () => {
      if (usuarioSeleccionado) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/consultas?usuarioId=${usuarioSeleccionado}`
          );
          setConsultas(response.data);
        } catch (error) {
          console.error("Error fetching consultas:", error);
        }
      } else {
        setConsultas([]);
      }
    };

    fetchConsultas();
  }, [usuarioSeleccionado]);

  // Obtener la lista de medicamentos al cargar el componente
  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/medicamentos");
        setMedicamentos(response.data);
      } catch (error) {
        console.error("Error fetching medicamentos:", error);
      }
    };

    fetchMedicamentos();
  }, []);

  // Autocompletar descripción y dosis cuando se selecciona un medicamento
  useEffect(() => {
    if (medicamentoSeleccionado) {
      const medicamento = medicamentos.find((m) => m.medicamentoid === medicamentoSeleccionado);
      if (medicamento) {
        setDescripcionMedicamento(medicamento.descripcion);
        setDosisMedicamento(medicamento.dosis);
      }
    } else {
      setDescripcionMedicamento("");
      setDosisMedicamento("");
    }
  }, [medicamentoSeleccionado, medicamentos]);

  // Función para agregar un medicamento a la tabla
  const agregarMedicamento = () => {
    if (medicamentoSeleccionado && descripcionMedicamento && dosisMedicamento) {
      const medicamento = medicamentos.find((m) => m.medicamentoid === medicamentoSeleccionado);
      if (medicamento) {
        setMedicamentosAgregados((prev) => [
          ...prev,
          {
            medicamentoid: medicamento.medicamentoid,
            nombre: medicamento.nombre,
            descripcion: descripcionMedicamento,
            dosis: dosisMedicamento,
          },
        ]);
        setMedicamentoSeleccionado("");
        setDescripcionMedicamento("");
        setDosisMedicamento("");
      }
    }
  };

  // Función para enviar la receta al backend
  const generarReceta = async () => {
    if (!usuarioSeleccionado || !fechaEmision || !indicaciones || !consultaSeleccionada) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const recetaData = {
      consultaid: consultaSeleccionada,
      fechaEmision,
      indicaciones,
      medicamentos: medicamentosAgregados.map((m) => m.medicamentoid),
    };

    try {
      console.log(recetaData);
      const response = await axios.post("http://localhost:4000/api/recetas", recetaData);
      console.log("Receta generada:", response.data);
      alert("Receta generada exitosamente");
    } catch (error) {
      console.error("Error generando receta:", error);
      alert("Error receta medica ya creada");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card style={{ backgroundColor: "#e8f5e9", borderRadius: "12px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom style={{ color: "#2e7d32", fontWeight: "bold" }}>
            Generar Receta Médica
          </Typography>

          {/* Campo para seleccionar usuario */}
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel>Seleccionar Usuario</InputLabel>
            <Select
              value={usuarioSeleccionado}
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              label="Seleccionar Usuario"
              required
            >
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.numerodocumento} value={usuario.numerodocumento}>
                  {usuario.nombre} - {usuario.numerodocumento}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Campo para seleccionar consulta */}
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel>Seleccionar Consulta</InputLabel>
            <Select
              value={consultaSeleccionada}
              onChange={(e) => setConsultaSeleccionada(e.target.value)}
              label="Seleccionar Consulta"
              required
            >
              {consultas.map((consulta) => (
                <MenuItem key={consulta.consultaid} value={consulta.consultaid}>
                  {consulta.notasmedicas}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Campo para la fecha de emisión */}
          <TextField
            fullWidth
            label="Fecha de Emisión"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={fechaEmision}
            onChange={(e) => setFechaEmision(e.target.value)}
            style={{ marginBottom: "15px" }}
            required
          />

          {/* Campo para las indicaciones */}
          <TextField
            fullWidth
            label="Indicaciones"
            multiline
            rows={3}
            variant="outlined"
            value={indicaciones}
            onChange={(e) => setIndicaciones(e.target.value)}
            style={{ marginBottom: "15px" }}
            required
          />

          {/* Sección para agregar medicamentos */}
          <Typography variant="h6" gutterBottom style={{ color: "#388e3c" }}>
            Agregar Medicamentos
          </Typography>
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <FormControl fullWidth>
              <InputLabel>Nombre del Medicamento</InputLabel>
              <Select
                value={medicamentoSeleccionado}
                onChange={(e) => setMedicamentoSeleccionado(e.target.value)}
                label="Nombre del Medicamento"
              >
                {medicamentos.map((medicamento) => (
                  <MenuItem key={medicamento.medicamentoid} value={medicamento.medicamentoid}>
                    {medicamento.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              value={descripcionMedicamento}
              disabled
            />
            <TextField
              label="Dosis"
              variant="outlined"
              fullWidth
              value={dosisMedicamento}
              disabled
            />
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#4caf50", color: "#fff" }}
            onClick={agregarMedicamento}
          >
            Agregar
          </Button>

          {/* Tabla de medicamentos agregados */}
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#a5d6a7" }}>
                <TableRow>
                  <TableCell>
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Descripción</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Dosis</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicamentosAgregados.map((medicamento) => (
                  <TableRow key={medicamento.medicamentoid}>
                    <TableCell>{medicamento.nombre}</TableCell>
                    <TableCell>{medicamento.descripcion}</TableCell>
                    <TableCell>{medicamento.dosis}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Botón para generar la receta */}
          <Button
            variant="contained"
            style={{ backgroundColor: "#2e7d32", color: "#fff", marginTop: "20px" }}
            onClick={generarReceta}
          >
            Generar Receta
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistroReceta;