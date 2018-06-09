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
import 'rxjs/add/operator/catch';
import { Card } from './../../interfaces/Card';
import { ITEM_URL } from './../../app.constants';
import { ITEMS_URL } from './../../app.constants';
import { FILES_URL } from './../../app.constants';
import { LOGIN_URL } from './../../app.constants';
import { CONFIG_URL } from './../../app.constants';


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

    this.http.post(LOGIN_URL, messageBody, { headers: messageHeader })
    .map(response => response.json()).catch(this.handleErrors).subscribe(info => {
      localStorage.setItem('userTokenBlurCentic', info ['token']);
    });
    this.isLoggedIn();
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
     this.isLoggedIn();
  }

  uploadFile(file: FormData){
    /*
    Esta función sube un fichero (imágen) al Api.
    */
    let messageHeader = new Headers();
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    return this.http.post(FILES_URL, file, {headers: messageHeader});
  }

  uploadCard(card: Card){
    /*
    Esta función sube una tarjeta al Api
    */
    let messageHeader = new Headers();
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    messageHeader.append( 'Content-Type', 'application/json' );

    return this.http.post(ITEMS_URL, JSON.stringify(card),{headers: messageHeader}).catch(this.handleErrors);
  }

  removeCard(id: string){
    /*
    Esta función elimina una de las tarjetas del Api.
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));

    return this.http.delete(ITEMS_URL + '/' + id, {headers: messageHeader}).catch(this.handleErrors);
  }

  getAllCards(){
    /*
    Esta función recupera todas las tarjetas del Api. Devuelve un array con estas tarjetas.
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));

    return this.http.get(ITEMS_URL, {headers: messageHeader}).catch(this.handleErrors);
  }

  getConfig(){
    /*
    Esta función recupera la configuración de la partida del api.
    */
   let messageHeader = new Headers();
   messageHeader.append( 'Content-Type', 'application/json' );
   messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));

   return this.http.get(CONFIG_URL, {headers: messageHeader}).catch(this.handleErrors);
  }

  putConfig(config: string){
    /*
    Esta sube una configuración de la partida al api.
    */
   let messageHeader = new Headers();
   messageHeader.append( 'Content-Type', 'application/json' );
   messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
   var aux = { "id": config }
   return this.http.put(CONFIG_URL, JSON.stringify(aux), {headers: messageHeader}).catch(this.handleErrors);
  }

  getCard(_id: string){
    /*
    Esta función recupera la configuración del Api
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    return this.http.get(ITEM_URL + _id, {headers: messageHeader}).catch(this.handleErrors);
  }

  updateCard(card: Card){
    /*
    Esta función modifica los datos de una tarjeta que previamente se haya subido al Api.
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    return this.http.put(ITEMS_URL + '/' + card._id, JSON.stringify(card),{headers: messageHeader}).catch(this.handleErrors);
  }
/*
  updateCard(_id: string, time: number, clue: string, solution: string, letters: string, imageURL: string, publish: boolean){
    /*
    Esta función modifica los datos de una tarjeta que previamente se haya subido al Api.
    *//*
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));

    let card: Card = {
      "_id": _id,
      "time": time,
      "clue": clue,
      "solution": solution,
      "letters": letters,
      "imageURL": imageURL,
      "publish": publish
    };
    this.http.put(ITEMS_URL + '/' + _id, JSON.stringify(card),{headers: messageHeader}).catch(this.handleErrors).subscribe(data => {
      console.log(data);
    }), err => {
      console.log(err);
    };
  }
*/


  handleErrors(error: Response) {
    /*
    Esta función maneja los errores producidos durante la comunicación.
    */
    return Observable.throw(error);
  }

}
