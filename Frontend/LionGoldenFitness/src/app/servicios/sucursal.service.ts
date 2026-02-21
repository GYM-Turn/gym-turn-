import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../models/sucursal.model';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  
 private apiUrl = 'http://localhost:3000/sucursales';

  constructor(private http: HttpClient) {}

  getSucursales(): Observable<Sucursal[]> {
  return this.http.get<Sucursal[]>(this.apiUrl);
}
}