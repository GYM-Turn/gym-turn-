import { Component } from '@angular/core';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { Nav } from '../../componentes-compartidos/nav/nav';


@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [Footer,Nav],
  templateUrl: './sedes.html',
  styleUrls: ['./sedes.css']
})
export class SedesComponent {

  sedes = [
  {
    nombre: 'LionGoldenFitness Centro',
    direccion: 'Av. Colón 123',
    ciudad: 'Córdoba',
    telefono: '351 555-1234',
    horario: 'Lunes a Viernes 7:00 - 22:00',
    imagen: '/img/sucursal.png',
  },
  {
    nombre: 'LionGoldenFitness Norte',
    direccion: 'Juan B. Justo 850',
    ciudad: 'Córdoba',
    telefono: '351 555-5678',
    horario: 'Lunes a Sábado 8:00 - 21:00',
    imagen: '/img/sucursal2.jpg',
  }
];
}