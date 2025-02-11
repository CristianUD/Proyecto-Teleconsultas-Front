import React, { useState, useEffect } from "react";
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "axios";

const GenerarHistoria = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
    const [citas, setCitas] = useState([]);
    const [citaSeleccionada, setCitaSeleccionada] = useState("");
    const [notasMedicas, setNotasMedicas] = useState("");

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

    useEffect(() => {
        const fetchCitas = async () => {
            if (usuarioSeleccionado) {
                try {
                    const response = await axios.get(
                        `http://localhost:4000/api/citas?numerodocumento=${usuarioSeleccionado}`
                    );
                    setCitas(response.data);
                } catch (error) {
                    console.error("Error fetching citas:", error);
                }
            } else {
                setCitas([]);
            }
        };

        fetchCitas();
    }, [usuarioSeleccionado]);

    const guardarHistoria = async () => {
        if (!citaSeleccionada || !notasMedicas) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const historiaData = {
            citaid: citaSeleccionada,
            notasmedicas: notasMedicas,
        };

        try {
            const response = await axios.post("http://localhost:4000/api/historia", historiaData); // Ajusta la ruta si es diferente
            console.log("Historia guardada:", response.data);
            alert("Historia guardada exitosamente");
            // Limpiar campos después de guardar
            setCitaSeleccionada("");
            setNotasMedicas("");
        } catch (error) {
            console.error("Error guardando historia:", error);
            alert("Error al guardar la historia");
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Card style={{ backgroundColor: "#e8f5e9", borderRadius: "12px", padding: "20px" }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom style={{ color: "#2e7d32", fontWeight: "bold" }}>
                        Generar Historia Médica
                    </Typography>

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

                    <FormControl fullWidth style={{ marginBottom: "15px" }}>
                        <InputLabel>Seleccionar Cita</InputLabel>
                        <Select
                            value={citaSeleccionada}
                            onChange={(e) => setCitaSeleccionada(e.target.value)}
                            label="Seleccionar Cita"
                            required
                        >
                            {citas.map((cita) => (
                                <MenuItem key={cita.citaid} value={cita.citaid}>
                                    {cita.fecha}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Notas Médicas"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={notasMedicas}
                        onChange={(e) => setNotasMedicas(e.target.value)}
                        style={{ marginBottom: "15px" }}
                        required
                    />

                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#2e7d32", color: "#fff" }}
                        onClick={guardarHistoria}
                    >
                        Guardar Historia
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default GenerarHistoria;