import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';
import { Response } from '../models/response';
import { htppOption } from '../common/herramientas';



@Injectable({
  providedIn: 'root'
})
export class ApiventaService {

  url:string = 'https://localhost:7056/api/Venta';

  constructor( private hhtp: HttpClient) { }


  add(venta: Venta): Observable<Response>{
      return this.hhtp.post<Response>(this.url, venta, htppOption )
  }
}
