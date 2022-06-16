import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { htppOption } from '../common/herramientas';
import { Producto } from '../models/producto';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApiproductoService {

  url: string = 'https://localhost:7056/api/Producto';

  constructor(private http:HttpClient) { }

  getProducto(): Observable<Response>{
    return this.http.get<Response>(this.url);
  }

  editProducto(producto:Producto): Observable<Response>{
    return this.http.put<Response>(this.url, producto, htppOption)
  }

  add(producto:Producto): Observable<Response> {
    return this.http.post<Response>(this.url, producto, htppOption);
  }

  delete(id:number): Observable<Response> {
    return this.http.delete<Response>(`${this.url}/${id}`);
  }
}


