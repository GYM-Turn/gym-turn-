import { Component } from '@angular/core';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { Nav } from '../../componentes-compartidos/nav/nav';

@Component({
  selector: 'app-quienes-somos',
  imports: [Nav,Footer],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css',
})
export class QuienesSomos {

}
