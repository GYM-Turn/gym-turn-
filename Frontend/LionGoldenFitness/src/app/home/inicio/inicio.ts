import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Nav } from '../../componentes-compartidos/nav/nav';
import { Footer } from '../../componentes-compartidos/footer/footer';
import * as AOS from 'aos';

@Component({
  selector: 'app-inicio',
  imports: [Nav,Footer,RouterOutlet],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  mostrarAnual = signal(false); 

  togglePlanes() {
    this.mostrarAnual.set(!this.mostrarAnual());
    // Refrescamos después de un pequeño delay para que AOS detecte los nuevos planes
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  ngOnInit() {
    // Solo refrescamos para asegurarnos que detecte el HTML de este componente
    AOS.refresh();
  }
}
