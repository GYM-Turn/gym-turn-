export interface Actividad {
  id?: number;
  nombre: string;
  descripcion: string;
  cupos: number;           // cupos máximos
  cupos_ocupados: number;  // para cálculo dinámico
  duracion: number;        // minutos
  activa: boolean;
}
