import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../models/inscripcion.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {

  private apiUrl = `${environment.apiUrl}/api/inscripciones/`;

  constructor(private http: HttpClient) {}

  // Obtener todas
  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  // Por usuario
  getInscripcionesByUsuario(idUsuario: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}?id_usuario=${idUsuario}&estado=1`
    );
  }

  // Crear
  crearInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  // Por usuario y turno
  getInscripcionesPorUsuarioYTurno(idUsuario: number, idTurno: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}?id_usuario=${idUsuario}&id_turno=${idTurno}&estado=1`
    );
  }

  // Cancelar
  cancelarInscripcion(id: number): Observable<Inscripcion> {
    return this.http.patch<Inscripcion>(
      `${this.apiUrl}${id}/`,
      { estado: 2 }
    );
  }
}