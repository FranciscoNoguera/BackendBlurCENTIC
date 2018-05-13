/**
 * Este servicio implementa las comunicaciones http con el API de CENTIC
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConectionService {
  
  constructor( private http: Http, private router: Router ) { }

  logIn( user: String, password: String ) {
    /*
    Esta función autentica al usuario frente al API.
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    let credentials = { "user": user, "password": password }
    let messageBody = JSON.stringify(credentials);

    this.http.post('https://gameserver.centic.ovh/auth/login', messageBody, { headers: messageHeader })
    .map(response => response.json()).subscribe( info => {
        console.log("Token:", info);
        localStorage.setItem('userTokenBlurCentic', info ['token']);
      }, err => {
        console.log("An error ocurred");
      }
    );
  }

  isLoggedIn() {
    /*
    Esta función comprueba si un usuario se encuentra autenticado. En caso afirativo
    devolverá true. En caso negativo false y redirigirá a la página de registro.
    */
    if(localStorage.getItem('userTokenBlurCentic')) {
      this.router.navigateByUrl('home');
      return;
    }
    this.router.navigateByUrl('login');
  }

  logOut(): void {
    /*
    Esta función cierra la sesión de un usuario previamente autenticado. Para esto 
    elimina el token de usuario almacenado en meemoria
    */
     localStorage.removeItem('userTokenBlurCentic');
  }

  uploadFile(file: FormData){
    /*
    Esta función sube un fichero al Api.
    */
    let messageHeader = new Headers();
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    return this.http.post('https://gameserver.centic.ovh/files', file, {headers: messageHeader});
  }

}
