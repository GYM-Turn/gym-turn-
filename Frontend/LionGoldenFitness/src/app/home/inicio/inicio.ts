import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Nav } from '../../componentes-compartidos/nav/nav';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { CommonModule } from '@angular/common'; // Necesario para filtros de moneda
import * as AOS from 'aos';

import { FAQService } from '../../servicios/faq-service';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Nav, Footer, RouterOutlet, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  // 1. Inyectamos el servicio
  private faqServices = inject(FAQService);

  // 2. Traemos los planes del servicio
  faqs = this.faqServices.getFAQs();

  mostrarAnual = signal(false); 

  togglePlanes() {
    this.mostrarAnual.set(!this.mostrarAnual());
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  ngOnInit() {
    AOS.refresh();
  }
}
