import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  usuario!: Usuario;

  constructor(public apiAuth: ApiauthService,
              private router: Router
    ){

      this.apiAuth.usuario.subscribe(response =>{
        this.usuario = response;
        console.log("cambio el objeto"+ response)
      });

  }

  logout(){
    this.apiAuth.logout();
    this.router.navigate(['/login'])
  }
}
