import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decode = jwtDecode(token);
    return decode.rol;
  } catch (error) {
    console.error("Error al decodificar el token", error);
    return null;
  }
}

export function getUserName() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decode = jwtDecode(token);
    return decode.nombre;
  } catch (error) {
    console.error("Error al decodificar el token", error);
    return null;
  }
}