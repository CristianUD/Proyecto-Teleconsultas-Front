import React from "react";
import { getUserName, getUserRole } from "../utils/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const useRole = getUserRole();
  const UseName = getUserName();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2e7d32", boxShadow: 3 }}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYiSJc0b2-jNjvWl5EkufEcCsTlJXnv1xYA&s"
              alt="Logo Aliansalud"
              style={{ height: 40, marginRight: 10 }}
            />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/")}>Inicio</Button>
            <Button sx={{ color: "#fff" }} onClick={() =>
              useRole === "Profesional" ? navigate("/SchedulePro") : navigate("/Schedule")
            }>
              {useRole === "Profesional" ? "Gestor de citas" : "Solicitar cita"}
            </Button>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/GenerarRecetas")}>
              {useRole === "Profesional" ? "Generar Receta" : "Recetas Médicas"}
            </Button>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/historia")}> 
              {useRole === "Profesional" ? "Generar Historia" : "Historia Médica"}
            </Button>
          </Box>

          <Box>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                src="https://cdn.icon-icons.com/icons2/1161/PNG/512/1487716857-user_81635.png"
                sx={{ width: 40, height: 40, border: "2px solid #fff" }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disabled>
                <Box>
                  <Typography variant="body1" fontWeight="bold">{UseName}</Typography>
                  <Typography variant="body2" color="gray">{useRole}</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={() => navigate("/perfil")}>Perfil</MenuItem>
              <MenuItem onClick={() => navigate("/citas")}>Mis Citas</MenuItem>
              <MenuItem onClick={() => { localStorage.removeItem("token"); navigate("Login"); }}>Cerrar Sesión</MenuItem>
            </Menu>
          </Box>

          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, ml: 2, color: "#fff" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
