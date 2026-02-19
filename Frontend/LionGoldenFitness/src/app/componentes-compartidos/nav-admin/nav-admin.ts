import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-nav-admin',
  imports: [RouterLink],
  templateUrl: './nav-admin.html',
  styleUrls: ['./nav-admin.css', '../nav/nav.css'],
})
export class NavAdmin {

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
