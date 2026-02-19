import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';
import { Rol } from '../models/enums/rol';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';
  private currentUser: Usuario | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ===============================
  // 🔐 AUTENTICACIÓN
  // ===============================

  login(email: string, password: string): Observable<Usuario> {
    return this.http
      .get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (!users.length) {
            throw new Error('Credenciales incorrectas');
          }
          return users[0];
        }),
        tap(user => {
          this.currentUser = user;
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/iniciar-sesion']); // ✅ corregido
  }

  // ===============================
  // 👤 USUARIO ACTUAL
  // ===============================

  /**
   * Método principal que usará el Guard
   */
  getUsuarioActual(): Usuario | null {

    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = localStorage.getItem('user');

    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getUsuarioActual();
  }

  isAdmin(): boolean {
    return this.getUsuarioActual()?.rol === Rol.ADMINISTRADOR;
  }

  isUsuario(): boolean {
    return this.getUsuarioActual()?.rol === Rol.USUARIO;
  }

  // ===============================
  // 👥 CRUD USUARIOS
  // ===============================

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioById(id: string | number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  updateUsuario(id: string | number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  patchUsuario(id: string | number, cambios: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}`, cambios);
  }

  deleteUsuario(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
