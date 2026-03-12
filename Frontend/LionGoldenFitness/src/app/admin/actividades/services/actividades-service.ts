import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadAdminDTO } from '../../../models/actividad-admin-dto';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {

  private apiUrl = 'http://localhost:8000/api/actividades';

  constructor(private http: HttpClient) {}

  getActividades(): Observable<ActividadAdminDTO[]> {
    return this.http.get<ActividadAdminDTO[]>(`${this.apiUrl}/`);
  }

  createActividad(a: Partial<ActividadAdminDTO>): Observable<ActividadAdminDTO> {
    return this.http.post<ActividadAdminDTO>(`${this.apiUrl}/`, a);
  }

  updateActividad(id: number, a: Partial<ActividadAdminDTO>): Observable<ActividadAdminDTO> {
    return this.http.put<ActividadAdminDTO>(`${this.apiUrl}/${id}/`, a);
  }

  deleteActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

}