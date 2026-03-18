import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Rol } from '../models/enums/rol';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiLoginUrl = `${environment.apiUrl}/api/login/`;
  private apiUsuariosUrl = `${environment.apiUrl}/api/usuarios/`;

  // 🔥 Usuario reactivo
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.cargarUsuarioDesdeStorage();
  }

  // ===============================
  // 🔐 LOGIN (NUEVO)
  // ===============================

  login(email: string, password: string): Observable<Usuario> {
    return this.http
      .post<Usuario>(this.apiLoginUrl, {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          this.setUsuarioActual(user);
        }),
      );
  }

  // ===============================
  // 🚪 LOGOUT
  // ===============================

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/iniciar-sesion']);
  }

  // ===============================
  // 👤 USUARIO ACTUAL
  // ===============================

  private cargarUsuarioDesdeStorage(): void {
    const stored = localStorage.getItem('user');

    if (stored) {
      const usuario: Usuario = JSON.parse(stored);

      // 🔥 asegurar que rol sea número
      usuario.rol = Number(usuario.rol);

      this.currentUserSubject.next(usuario);
    }
  }

  getUsuarioActual(): Usuario | null {
    return this.currentUserSubject.value;
  }

  setUsuarioActual(usuario: Usuario): void {
    // 🔥 asegurar tipo correcto
    usuario.rol = Number(usuario.rol);

    localStorage.setItem('user', JSON.stringify(usuario));

    this.currentUserSubject.next(usuario);
  }

  actualizarSesion(cambios: Partial<Usuario>): void {
    const usuarioActual = this.getUsuarioActual();
    if (!usuarioActual) return;

    const usuarioActualizado: Usuario = {
      ...usuarioActual,
      ...cambios,
    };

    this.setUsuarioActual(usuarioActualizado);
  }

  // ===============================
  // 🔎 ESTADO DE SESIÓN
  // ===============================

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
    return this.http.post<Usuario>(this.apiUsuariosUrl, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUsuariosUrl);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUsuariosUrl}${id}/`);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUsuariosUrl}${id}/`, usuario);
  }

  patchUsuario(id: number, cambios: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUsuariosUrl}${id}/`, cambios);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUsuariosUrl}${id}/`);
  }
}