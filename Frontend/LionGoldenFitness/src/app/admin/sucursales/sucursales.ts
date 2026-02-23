import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sucursal } from '../../models/sucursal.model';
import { SucursalService } from '../../servicios/sucursal.service';
import { SucursalesForm } from './sucursales-form/sucursales-form';
import { NavAdmin } from "../../componentes-compartidos/nav-admin/nav-admin";
import { Footer } from "../../componentes-compartidos/footer/footer";

@Component({
  selector: 'app-admin-sucursales',
  standalone: true,
  imports: [CommonModule, SucursalesForm, NavAdmin, Footer],
  templateUrl: './sucursales.html',
  styleUrls: ['./sucursales.css']
})
export class Sucursales implements OnInit {

  sucursales: Sucursal[] = [];
  mostrarFormulario = false;
  sucursalSeleccionada?: Sucursal;

  constructor(private sucursalService: SucursalService) {}

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales() {
    this.sucursalService.getSucursales().subscribe(data => {
      this.sucursales = data;
    });
  }

  crearSucursal() {
    this.sucursalSeleccionada = undefined;
    this.mostrarFormulario = true;
  }

  editarSucursal(sucursal: Sucursal) {
    this.sucursalSeleccionada = sucursal;
    this.mostrarFormulario = true;
  }

  eliminarSucursal(id: string) {
    this.sucursalService.deleteSucursal(id).subscribe(() => {
      this.cargarSucursales();
    });
  }

  recargarSucursales() {
    this.mostrarFormulario = false;
    this.sucursalSeleccionada = undefined;
    this.cargarSucursales();
  }
}