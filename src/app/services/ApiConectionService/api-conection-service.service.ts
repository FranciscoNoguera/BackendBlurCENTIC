/**
 * Este servicio implementa las comunicaciones http con el API de CENTIC
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiConectionService {
  
  constructor( private http: HttpClient ) { }

  logIn( user, password ) {
    /*
    Esta función autentica al usuario frente al API.
    */
    let messageHeader = new HttpHeaders({ 'Contnet-Type': 'application/json' });
    let credentials = { "user": user, "password": password }
    let messageBody = JSON.stringify(credentials);

    return this.http.post('https://gameserver.centic.ovh/auth/login', messageBody, { headers: messageHeader });
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
     localStorage.removeItem('userToken');  }

}
