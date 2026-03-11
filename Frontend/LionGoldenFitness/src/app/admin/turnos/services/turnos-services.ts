import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../../../models/turno';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  private apiUrl = 'http://localhost:8000/api/turnos/'; // ajustar a tu backend

  constructor(private http: HttpClient) {}

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  getTurnoById(id: string): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/${id}`);
  }

  getTurnosByUsuario(usuarioId: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  createTurno(turno: any): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  updateTurno(id: string, turno: any): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno);
  }

  deleteTurno(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}