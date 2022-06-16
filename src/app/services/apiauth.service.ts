import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Login } from "../models/login";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";

const htppOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplicattion/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiauthService {

    url: string = 'https://localhost:7056/api/User/Login';

    private usuarioSubject!: BehaviorSubject<Usuario>;

    public usuario!: Observable<Usuario>;

    public get usuarioData(): Usuario{
      return this.usuarioSubject.value;
    }

    constructor(private http: HttpClient){
      this.usuarioSubject =
      new BehaviorSubject(JSON.parse(localStorage.getItem("usuario")!))
      this.usuario = this.usuarioSubject.asObservable();
    }


    login(login: Login): Observable<Response> {
        return this.http.post<Response>(this.url, login, htppOption).pipe(
          map(res =>{
            if (res.exito === 1){
                const usuario: Usuario = res.data;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                this.usuarioSubject.next(usuario);
            }
            return res
          })
        );
    }

    logout(){
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null!);
    }

}

