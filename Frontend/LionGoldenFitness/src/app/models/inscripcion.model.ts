import { Turno } from './turno' 
import { Estado } from './enums/estado';

export interface Inscripcion {
  id: number;
  turno: Turno;
  estado: Estado;
}
