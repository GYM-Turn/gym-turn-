import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Rol } from '../models/enums/rol';

export const authGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getUsuarioActual();

  if (!usuario) {
    router.navigate(['/iniciar-sesion']);
    return false;
  }

  const rolPermitido = route.data?.['rol'];

  if (rolPermitido && usuario.rol !== rolPermitido) {
    router.navigate(['/inicio']);
    return false;
  }

  return true;
};
