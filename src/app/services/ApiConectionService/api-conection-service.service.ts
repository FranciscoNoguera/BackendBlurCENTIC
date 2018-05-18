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
import { Card } from './../../interfaces/Card';

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
    Esta función sube un fichero (imágen) al Api.
    */
    let messageHeader = new Headers();
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    return this.http.post('https://gameserver.centic.ovh/files', file, {headers: messageHeader});
  }

  uploadCard(id: string, time: number, clue: string, solution: string, letters: string, imageURL: string, publish: boolean){
    /*
    Esta función sube una tarjeta al Api
    */
    let messageHeader = new Headers();
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    messageHeader.append( 'Content-Type', 'application/json' );
    let card: Card = {
      "id": id,
      "time": time,
      "clue": clue,
      "solution": solution,
      "letters": letters,
      "imageURL": imageURL,
      "publish": publish
    };
    return this.http.post('https://gameserver.centic.ovh/files', JSON.stringify(card),{headers: messageHeader});
  }

  getAllCards(){
    /*
    Esta función recupera todas las tarjetas del Api. Devuelve un array con estas tarjetas.
    */
    let messageHeader = new Headers();
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    return this.http.get<Card[]>('https://gameserver.centic.ovh/items',{headers: messageHeader});
  }

}
