import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscripcion } from '../models/inscripcion.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurneroService {

  private apiUrl = `${environment.apiUrl}/api/inscripciones/`;

  constructor(private http: HttpClient) {}

  // Obtener todas
  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  // Por DNI
  obtenerPorUsuario(dni: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}?dni=${dni}`
    );
  }

  // Crear
  crearInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  // Cancelar
  cancelarInscripcion(id: number) {
    return this.http.patch(`${this.apiUrl}${id}/`, {
      estado: 2
    });
  }
}