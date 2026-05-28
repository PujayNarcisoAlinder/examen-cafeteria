import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { 
    console.log('🟣 Servicio creado');
  }

  getProductos(): Observable<Producto[]> {
    console.log('🔵 Haciendo GET a:', `${this.apiUrl}/productos`);
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  registrarPedido(pedido: Pedido): Observable<any> {
    console.log('📝 Enviando pedido:', pedido);
    return this.http.post(`${this.apiUrl}/pedidos`, pedido);
  }
}