import { Estado } from './enums/estado';


export interface Inscripcion {
  id: string; 
  estado: Estado;
  id_turno: number;
  id_usuario: number;
}
