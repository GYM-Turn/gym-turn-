import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../../../models/turno';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {

  private apiUrl = `${environment.apiUrl}/api/turnos/`;

  constructor(private http: HttpClient) {}

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  getTurnoById(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}${id}/`);
  }

  getTurnosByUsuario(usuarioId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  createTurno(turno: any): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  updateTurno(id: number, turno: any): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}${id}/`, turno);
  }

  deleteTurno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}