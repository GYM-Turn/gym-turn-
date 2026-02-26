import { Component, OnInit } from '@angular/core';
import { Footer } from '../../componentes-compartidos/footer/footer';
import { NavAdmin } from '../../componentes-compartidos/nav-admin/nav-admin';
import { TurnoService } from '../turnos/services/turnos-services';
import { UsuarioService } from '../../admin/usuarios/services/usuario-service';
import { ActividadesService } from '../../admin/actividades/services/actividades-service';
import { SucursalService } from '../../servicios/sucursal.service';
@Component({
  selector: 'app-dashboard',
  imports: [Footer,NavAdmin],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  totalUsuarios = 0;
  totalActividades = 0;
  totalSucursales = 0;
  totalTurnos = 0;

  constructor(
    private usuarioService: UsuarioService,
    private actividadService: ActividadesService,
    private sucursalService: SucursalService,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {

    this.usuarioService.getUsuarios()
      .subscribe(data => this.totalUsuarios = data.length);

    this.actividadService.getActividades()
      .subscribe(data => this.totalActividades = data.length);

    this.sucursalService.getSucursales()
      .subscribe(data => this.totalSucursales = data.length);

    this.turnoService.getTurnos()
      .subscribe(data => this.totalTurnos = data.length);
  }
}