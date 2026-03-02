import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Rol } from '../models/enums/rol';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';

  // 🔥 Usuario reactivo
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.cargarUsuarioDesdeStorage();
  }

  // ===============================
  // 🔐 LOGIN
  // ===============================

  login(email: string, password: string): Observable<Usuario> {
    return this.http
      .get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (!users.length) {
            throw new Error('Credenciales incorrectas');
          }

          // 🔥 NO convertimos el id
          return users[0];
        }),
        tap(user => {
          this.setUsuarioActual(user);
        })
      );
  }

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
      this.currentUserSubject.next(usuario);
    }
  }

  getUsuarioActual(): Usuario | null {
    return this.currentUserSubject.value;
  }

  setUsuarioActual(usuario: Usuario): void {
    // 🔥 Guardamos exactamente como viene (id string)
    localStorage.setItem('user', JSON.stringify(usuario));
    this.currentUserSubject.next(usuario);
  }

  actualizarSesion(cambios: Partial<Usuario>): void {
    const usuarioActual = this.getUsuarioActual();
    if (!usuarioActual) return;

    const usuarioActualizado: Usuario = {
      ...usuarioActual,
      ...cambios
    };

    this.setUsuarioActual(usuarioActualizado);
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

  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  patchUsuario(id: string, cambios: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}`, cambios);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}