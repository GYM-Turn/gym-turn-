import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../models/inscripcion.model';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private apiUrl = 'http://localhost:8000/api/inscripciones/';

  constructor(private http: HttpClient) {}

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  getInscripcionesByUsuario(idUsuario: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}?id_usuario=${idUsuario}&estado=1`);
  }

  crearInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  getInscripcionesPorUsuarioYTurno(idUsuario: number, idTurno: number) {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}?id_usuario=${idUsuario}&id_turno=${idTurno}&estado=1`,
    );
  }

  cancelarInscripcion(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, {
      estado: 2,
    });
  }
}