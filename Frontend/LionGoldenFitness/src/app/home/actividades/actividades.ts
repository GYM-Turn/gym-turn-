import { Component } from '@angular/core';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { Nav } from '../../componentes-compartidos/nav/nav';

@Component({
  selector: 'app-actividades',
  imports: [Footer, Nav],
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades {

  actividades = [
    {
      nombre: 'Musculación',
      imagen: '/img/imagen1.jpg',
      descripcion: 'Entrenamiento de fuerza con pesas y máquinas.',
      horario: 'Lunes a Viernes 8:00 - 12:00'
    },
    {
      nombre: 'Funcional',
      imagen: '/img/imagen2.jpg',
      descripcion: 'Ejercicios integrales para fuerza, movilidad y resistencia.',
      horario: 'Martes y Jueves 18:00 - 20:00'
    },
    {
      nombre: 'Spinning',
      imagen: '/img/imagen3.jpg',
      descripcion: 'Clases de ciclismo indoor con música motivadora.',
      horario: 'Lunes, Miércoles y Viernes 19:00 - 20:00'
    },
    {
      nombre: 'Zumba',
      imagen: '/img/imagen4.jpg',
      descripcion: 'Baile y cardio al ritmo de música latina.',
      horario: 'Martes y Jueves 17:00 - 18:00'
    },
    {
      nombre: 'GAP',
      imagen: '/img/imagen5.jpg',
      descripcion: 'Glúteos, abdomen y piernas: tonificación completa.',
      horario: 'Lunes y Miércoles 18:00 - 19:00'
    },
    {
      nombre: 'Boxeo',
      imagen: '/img/imagen6.jpg',
      descripcion: 'Entrenamiento de boxeo y defensa personal.',
      horario: 'Martes y Jueves 19:00 - 20:30'
    }
  ];

}
