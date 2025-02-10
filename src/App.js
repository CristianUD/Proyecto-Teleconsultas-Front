import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import HomeProfesional from "./components/HomeProfesional";
import Menu from "./components/Navbar";
import Register from "./components/Register";
import Schedule from "./components/Schedule";
import SchedulePro from "./components/SchedulePro";
import ProtectedRoute from "./components/ProtectedR";
import Error404 from "./components/error404";
import GenRecetas from "./components/GenRecetas"; 
import { getUserRole } from "./utils/auth";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const rol = getUserRole();
  const hideNavbar = ["/Login", "/Register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Menu />}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={rol === "Profesional" ? <HomeProfesional /> : rol === "Paciente" ? <Home /> : <Error404/>  } />
        <Route path="/Schedule" element={<ProtectedRoute element={<Schedule />} allowedRoles={["Paciente"]} />} />
        <Route path="/SchedulePro" element={<ProtectedRoute element={<SchedulePro />} allowedRoles={["Profesional"]} />} />
        <Route path="/GenerarRecetas" element={<ProtectedRoute element={<GenRecetas />} allowedRoles={["Profesional"]} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
