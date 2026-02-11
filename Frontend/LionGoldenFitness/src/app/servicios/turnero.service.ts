import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscripcion } from '../models/inscripcion.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TurneroService {
   private apiUrl = 'http://localhost:3000/inscripciones';

  constructor(private http: HttpClient) {}

  // Obtener todas las inscripciones
  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  // Obtener por DNI
  obtenerPorUsuario(dni: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}?dni=${dni}`
    );
  }

  // Crear inscripción
  crearInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  // Cancelar inscripción (cambiar estado)
  cancelarInscripcion(id: number) {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      estado: 2 // CANCELADA
    });
  }
}
  
