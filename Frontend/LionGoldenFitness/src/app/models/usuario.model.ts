import { Rol } from './enums/rol';

export interface Usuario {
  id?: number;
  dni: string;
  user: string; 
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  telefono: string;
  email: string;
  password: string;
  rol: Rol;
  foto?: string; // 👈 agregamos esto
}
