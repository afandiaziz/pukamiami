import { resource } from "./config";
import { ROLES } from "../config/roles";

export function register({ email, password, confirm, phone, name, role = ROLES.user }) {
  return resource.post("/register", { email, password, confirm, phone, name, role });
}

export function login({ email, password }) {
  return resource.post("/login", { email, password });
}
