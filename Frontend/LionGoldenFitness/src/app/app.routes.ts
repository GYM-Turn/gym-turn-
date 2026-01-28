import { Routes } from '@angular/router';
import { Inicio } from './home/inicio/inicio';
import { Sedes } from './home/sedes/sedes';
import { Actividades } from './home/actividades/actividades';
import { Contacto } from './home/contacto/contacto';
import { IniciarSesion } from './home/componentes-de-autenticacion/iniciar-sesion/iniciar-sesion';
import { RegistroNuevoUsuario } from './home/componentes-de-autenticacion/registro-nuevo-usuario/registro-nuevo-usuario';

export const routes: Routes = [
    // Redirección por defecto
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: Inicio },
    { path: "sedes", component: Sedes },
    { path: "actividades", component: Actividades },
    { path: "iniciar-sesion", component: IniciarSesion },
    { path: "registro-nuevo-usuario", component: RegistroNuevoUsuario },
    { path: "contacto", component: Contacto },
    
];
