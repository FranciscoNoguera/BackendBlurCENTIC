/**
 * Este servicio implementa las comunicaciones http con el API de CENTIC
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ApiConectionService {
  
  constructor( private http: Http ) { }

  logIn( user: String, password: String ) {
    /*
    Esta función autentica al usuario frente al API.
    */
    let messageHeader = new Headers();
    messageHeader.append('Content-Type', 'application/json' );
    let credentials = { "user": user, "password": password }
    let messageBody = JSON.stringify(credentials);

    this.http.post('https://gameserver.centic.ovh/auth/login', messageBody, { headers: messageHeader })
      .subscribe( info => {
        localStorage.setItem('userToken', info ['token']);
      });
      //Llevar a la página de control.
  }

  isLoggedIn() {
    /*
    Esta función comprueba si un usuario se encuentra autenticado. En caso afirativo
    devolverá true. En caso negativo false y redirigirá a la página de registro.
    */
    if(localStorage.getItem('userToken')) {
      return true;
    } else {
      //Devolver a la página de logIn no se ha impementado todavía.
      return false;
    }

  }

  logOut(): void {
    /*
    Esta función cierra la sesión de un usuario previamente autenticado. Para esto 
    elimina el token de usuario almacenado en meemoria
    */
     localStorage.removeItem('userToken');
  }

  uploadImage(imageName: String, imageURL:String) {
    let messageHeader = new Headers();
    messageHeader.append('Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userToken'));

    let messageBody = {
      "name": imageName,
      "image": imageURL
    }
    this.http.post( 'https://gameserver.centic.ovh/games/items/', JSON.stringify(messageBody), { headers: messageHeader })
    .subscribe( info => {
      console.log(info);
    });
  }

}
