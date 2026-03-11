import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceUsuario {
  private apiUrl = 'http://localhost:8000/api/usuarios';

  constructor(private http: HttpClient) {}

  // ==============================
  // 📌 OBTENER TODOS
  // ==============================
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // ==============================
  // 📌 OBTENER POR ID (STRING)
  // ==============================
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}/`);
  }

  // ==============================
  // 📌 CREAR USUARIO
  // ==============================
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // ==============================
  // 📌 ACTUALIZAR COMPLETO (PUT)
  // ==============================
  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}/`, usuario);
  }

  // ==============================
  // 📌 ACTUALIZAR PARCIAL (PATCH)
  // ==============================
  patchUsuario(id: string, datos: any): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/`, datos);
  }

  // ==============================
  // 📌 ELIMINAR
  // ==============================
  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  // ==============================
  // 📌 BUSCAR POR EMAIL
  // ==============================
  buscarPorEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

  // ==============================
  // 📌 BUSCAR POR USERNAME
  // ==============================
  buscarPorUsername(user: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?user=${user}`);
  }
}