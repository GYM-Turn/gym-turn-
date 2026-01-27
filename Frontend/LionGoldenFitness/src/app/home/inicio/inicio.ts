import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Nav } from '../../componentes-compartidos/nav/nav';
import { Footer } from '../../componentes-compartidos/footer/footer';

@Component({
  selector: 'app-inicio',
  imports: [Nav,Footer],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
