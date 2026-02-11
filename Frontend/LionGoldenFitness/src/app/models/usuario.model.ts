import { Rol } from './enums/rol';

export interface Usuario {
  id?: number;
  dni: number;
  user: string; 
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  telefono: string;
  email: string;
  password: string;
  rol: Rol;
}
