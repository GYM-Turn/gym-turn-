import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { AsyncPipe } from '@angular/common';

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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }
}