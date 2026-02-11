import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SucursalServiceTs {
  
 private apiUrl = 'http://localhost:3000/sucursales';

  constructor(private http: HttpClient) {}

  obtenerSucursales() {
    return this.http.get(this.apiUrl);
  }
}