import { Component } from '@angular/core';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { Nav } from '../../componentes-compartidos/nav/nav';

@Component({
  selector: 'app-contacto',
  imports: [Nav, Footer],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

}
