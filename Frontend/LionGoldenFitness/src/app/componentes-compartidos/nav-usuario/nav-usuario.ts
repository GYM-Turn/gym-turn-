import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { AsyncPipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav-usuario',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    AsyncPipe
  ],
  templateUrl: './nav-usuario.html',
  styleUrls: ['./nav-usuario.css', '../nav/nav.css'],
})
export class NavUsuario {
  menuOpen = false;
  usuario$: Observable<Usuario | null>;

  constructor(public authService: AuthService) {
    this.usuario$ = this.authService.currentUser$;
  }

  resolverUrl(fotoUrl: string | null | undefined): string {
    // Si no hay foto, devolvemos la de por defecto inmediatamente
    if (!fotoUrl) {
      return '/img/default-user.png';
    }
    
    // Ahora TypeScript sabe que aquí 'fotoUrl' es sí o sí un string
    if (fotoUrl.startsWith('http')) {
      return fotoUrl;
    }
    return `${environment.apiUrl}${fotoUrl}`;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }
}