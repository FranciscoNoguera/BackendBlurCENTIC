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
import { ITEMS_URL } from './../../app.constants';
import { FILES_URL } from './../../app.constants';
import { LOGIN_URL } from './../../app.constants';

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
      //console.log("Token:", info);
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

  uploadCard(time: number, clue: string, solution: string, letters: string, imageURL: string, publish: boolean){
    /*
    Esta función sube una tarjeta al Api
    */
    let messageHeader = new Headers();
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));
    messageHeader.append( 'Content-Type', 'application/json' );
    let card: Card = {
      "time": time,
      "clue": clue,
      "solution": solution,
      "letters": letters,
      "imageURL": imageURL,
      "publish": publish
    };
    return this.http.post(ITEMS_URL, JSON.stringify(card),{headers: messageHeader});
  }

  removeCard(id: string){
    /*
    Esta función elimina una de las tarjetas del Api.
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));

    this.http.delete(ITEMS_URL + '/' + id, {headers: messageHeader}).catch(this.handleErrors)//.map(data => data.json).catch(this.handleErrors)
      .subscribe(info => {
        console.log(info);
      }), err => {
        console.log(err);
      };
  }

  getAllCards(){
    /*
    Esta función recupera todas las tarjetas del Api. Devuelve un array con estas tarjetas.
    */
    let messageHeader = new Headers();
    messageHeader.append( 'Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userTokenBlurCentic'));

    console.log("Token de usuario", localStorage.getItem('userTokenBlurCentic'));
    console.log("Ejecutando conexión API");
    //return this.http.get<Card[]>(ITEMS_URL,{headers: messageHeader});
    this.http.get(ITEMS_URL,{headers: messageHeader})
      .map(data => data.json).catch(this.handleErrors).subscribe(info =>{
        console.log("Info = ", info);
        console.log("Info = ", info[0]);
        /*for(let i=0; i<info.length; i++){
          console.log("Datos ", i, ": ", info[i]);
        }*/
      });

      /*this.http.post(LOGIN_URL, messageBody, { headers: messageHeader })
      .map(response => response.json()).catch(this.handleErrors).subscribe(info => {
        //console.log("Token:", info);
        localStorage.setItem('userTokenBlurCentic', info ['token']);
      });*/
      /*this.apiConectionService.getAllCards().subscribe(data => {
      for(let i=0; i<data.length; i++){
        if(data[i].itemType=="0"){
          this.cards.push(data[i]);
          console.log("Data: ",data[i]);
        }
      }*/

  }

  handleErrors(error: Response) {
    return Observable.throw(error);
  }

}
