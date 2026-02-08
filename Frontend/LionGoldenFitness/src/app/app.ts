import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos'; // Importamos la librería AOS

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LionGoldenFitness');

  ngOnInit() {
    // Inicializamos las animaciones
    AOS.init({
      duration: 800,    // Duración de la animación (800ms es ideal para que sea ágil)
      easing: 'ease-in-out', // Suavizado de la transición
      once: false,      // Permite que se repita la animación si subes y bajas
      mirror: true,     // Anima elementos al scrollear hacia arriba también
      offset: 120       // Empieza la animación 120px antes de que el elemento aparezca
    });
  }
}
