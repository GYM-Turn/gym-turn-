import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceUsuario {

  private apiUrl = `${environment.apiUrl}/api/usuarios/`;

  constructor(private http: HttpClient) {}

  // Obtener todos
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Por ID
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}${id}/`);
  }

  // Crear
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Update completo
  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}${id}/`, usuario);
  }

  // Update parcial
  patchUsuario(id: string, datos: any): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}${id}/`, datos);
  }

  // Eliminar
  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

  // Buscar por email
  buscarPorEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

  // Buscar por username
  buscarPorUsername(user: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?user=${user}`);
  }
}