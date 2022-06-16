import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Response } from '../models/response';
import { htppOption } from '../common/herramientas';



@Injectable({
  providedIn: 'root'
})
export class ApiclientesService {

  url: string = 'https://localhost:7056/api/Cliente';

  constructor(
private http: HttpClient) { }

  getClientes(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  add(cliente: Cliente): Observable<Response> {
    return this.http.post<Response>(this.url, cliente, htppOption);
  }

  edit(cliente: Cliente): Observable<Response> {
    return this.http.put<Response>(this.url, cliente, htppOption);
  }

  delete(id:number): Observable<Response> {
    return this.http.delete<Response>(`${this.url}/${id}`);
  }
}
