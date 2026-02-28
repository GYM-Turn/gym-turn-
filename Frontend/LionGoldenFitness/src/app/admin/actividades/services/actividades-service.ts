import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Falta esta
import { Observable } from 'rxjs'; // Falta esta
import { ActividadAdminDTO } from '../../../models/actividad-admin-dto'; // Ajusta la ruta

@Injectable({
  providedIn: 'root',
})
export class ActividadesService { // Corregido: ActividadesService

  private apiUrl = 'http://localhost:3000/actividades';

  constructor(private http: HttpClient) {}

  getActividades(): Observable<ActividadAdminDTO[]> {
    return this.http.get<ActividadAdminDTO[]>(this.apiUrl);
  }

  createActividad(a: Partial<ActividadAdminDTO>): Observable<ActividadAdminDTO> {
    return this.http.post<ActividadAdminDTO>(this.apiUrl, a);
  }

  updateActividad(id: string, a: Partial<ActividadAdminDTO>): Observable<ActividadAdminDTO> {
    return this.http.put<ActividadAdminDTO>(`${this.apiUrl}/${id}`, a);
  }

  deleteActividad(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}