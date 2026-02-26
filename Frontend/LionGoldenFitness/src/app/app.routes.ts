import { Routes } from '@angular/router';
import { Inicio } from './home/inicio/inicio';
import { QuienesSomos } from './home/quienes-somos/quienes-somos';
import { SedesComponent } from './home/sedes/sedes';
import { Actividades } from './home/actividades/actividades';
import { Contacto } from './home/contacto/contacto';
import { IniciarSesion } from './home/componentes-de-autenticacion/iniciar-sesion/iniciar-sesion';
import { RegistroNuevoUsuario } from './home/componentes-de-autenticacion/registro-nuevo-usuario/registro-nuevo-usuario';
import { authGuard } from './guards/auth-guard';
import { Rol } from './models/enums/rol';

export const routes: Routes = [
  // ===============================
  // 🔁 REDIRECCIÓN INICIAL
  // ===============================
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // ===============================
  // 🌐 RUTAS PÚBLICAS
  // ===============================
  { path: 'inicio', component: Inicio },
  { path: 'quienes-somos', component: QuienesSomos },
  { path: 'sedes', component: SedesComponent },
  { path: 'actividades', component: Actividades },
  { path: 'contacto', component: Contacto },
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: 'registro-nuevo-usuario', component: RegistroNuevoUsuario },

  // ===============================
  // 👤 RUTA USUARIO
  // ===============================
  {
    path: 'usuario/dashboard',
    loadComponent: () =>
      import('./usuario/dashboard/dashboard').then((m) => m.DashboardUsuario),
    canActivate: [authGuard],
    data: { rol: Rol.USUARIO },
  },
  // ===============================
  // 🔴 RUTAS ADMIN
  // ===============================
  {
    path: 'admin/usuarios',
    loadComponent: () => import('./admin/usuarios/usuarios').then((m) => m.Usuarios),
    canActivate: [authGuard],
    data: { rol: Rol.ADMINISTRADOR },
  },
  {
    path: 'admin/actividades',
    loadComponent: () => import('./admin/actividades/actividades').then((m) => m.Actividades),
    canActivate: [authGuard],
    data: { rol: Rol.ADMINISTRADOR },
  },
  {
    path: 'admin/turnos',
    loadComponent: () => import('./admin/turnos/turnos').then((m) => m.AdminTurnosComponent),
    canActivate: [authGuard],
    data: { rol: Rol.ADMINISTRADOR },
  },
  {
    path: 'admin/sucursales',
    loadComponent: () => import('./admin/sucursales/sucursales').then((m) => m.Sucursales),
    canActivate: [authGuard],
    data: { rol: Rol.ADMINISTRADOR },
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    data: { rol: Rol.ADMINISTRADOR },
  },
  // ===============================
  // 🚫 RUTA NO ENCONTRADA
  // ===============================
  { path: '**', redirectTo: 'inicio' },
];
