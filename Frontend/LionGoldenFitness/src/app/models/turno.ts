
import { Actividad } from "./actividad";
import { Sucursal } from "./sucursal.model";


export interface Turno {
  id: number;
  actividad: Actividad;
  sucursal: Sucursal;
  fecha_hora: string;
  cupo_maximo: number;
  cupos_disponibles: number;
}