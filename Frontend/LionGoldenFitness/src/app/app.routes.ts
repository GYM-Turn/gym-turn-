import { Routes } from '@angular/router';
import { Inicio } from './home/inicio/inicio';
import { Sedes } from './home/sedes/sedes';
import { Actividades } from './home/actividades/actividades';
import { Contacto } from './home/contacto/contacto';

export const routes: Routes = [
    { path: "inicio", component: Inicio },
    { path: "sedes", component: Sedes },
    { path: "actividades", component: Actividades },
    { path: "contacto", component: Contacto },
    // Redirección por defecto
    { path: "", redirectTo: "inicio", pathMatch: "full" },
];
