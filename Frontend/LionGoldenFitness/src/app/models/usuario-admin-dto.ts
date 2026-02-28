import { Rol } from '../models/enums/rol'

export interface UsuarioAdminDTO {
  id?: string;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  creditos: number;
  activo: boolean;
}
