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
    messageHeader.append( 'Content-Type', 'application/json' );
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

  uploadImage(imageName: String): String {
    let messageHeader = new Headers();
    messageHeader.append('Content-Type', 'application/json' );
    messageHeader.append('Authorization',"Bearer " + localStorage.getItem('userToken'));

     let messageBody = {
      "publish": false,
      "name": imageName
    }

//La petición que tenéis que usar es Put Item la tenéis descrita en el Postman
//He dejado ya terinados la cabecera y el cuerpo del mensaje.
//Esta petición devuelve una URL que teneís que recoger y de la que se debe de hacer un return.
//También será necesario que le suministreis la imágen por parámetro a la función. Y es posible que para subirla al api tengais que convertirla a texto.
//Buscad en google "Upload image to a restful api" y saldrá mucha documentación

    /* Esto es un ejemplo de como se tiene que hacer la petición
    this.http.post( 'https://gameserver.centic.ovh/games/items/', JSON.stringify(messageBody), { headers: messageHeader })
    .subscribe( info => {
      console.log(info);
    });
    En este caso tendreis que hacer un put, por lo que será algo más así
    this.http.put(Parametros).subscribe( info => {
    })
    */
    return "url devuelta por la petición";
  }

}
