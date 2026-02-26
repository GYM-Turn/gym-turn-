import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-nav-usuario',
  imports: [RouterLink],
  templateUrl: './nav-usuario.html',
  styleUrls: ['./nav-usuario.css', '../nav/nav.css'],
  
})
export class NavUsuario {
  constructor(public authService: AuthService) {}
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout() {
    this.authService.logout();
  }
}
