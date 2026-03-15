import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../models/inscripcion.model';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {

  private apiUrl = 'http://localhost:8000/api/inscripciones';

  constructor(private http: HttpClient) {}

  // Obtener todas las inscripciones
  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/`);
  }

  // Obtener inscripciones por usuario
  getInscripcionesByUsuario(idUsuario: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}/?id_usuario=${idUsuario}&estado=1`
    );
  }

  // Crear inscripción
  crearInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${this.apiUrl}/`, inscripcion);
  }

  // Buscar inscripción por usuario y turno
  getInscripcionesPorUsuarioYTurno(idUsuario: number, idTurno: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}/?id_usuario=${idUsuario}&id_turno=${idTurno}&estado=1`
    );
  }

  // Cancelar inscripción
  cancelarInscripcion(id: number): Observable<Inscripcion> {
    return this.http.patch<Inscripcion>(
      `${this.apiUrl}/${id}/`,
      { estado: 2 }
    );
  }
}