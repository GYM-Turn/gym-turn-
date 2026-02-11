import { Actividad } from './enums/actividad';
import { Horario } from './enums/horario';
import { Estado } from './enums/estado';

export interface Inscripcion {
  id_inscripcion: number;
  actividad: Actividad;
  horario_actividades: Horario;
  fecha_hora: Date;
  estado: Estado;
  cupo: number;
  dni: number;
  id_sucursal: number;
}
