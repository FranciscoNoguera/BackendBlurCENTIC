/**
 * Este componente gestiona la recogida de credenciales de usuario para
 * realizar la autenticación frente al API
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiConectionService} from '../../services/ApiConectionService/api-conection-service.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  //En nuestro caso para conectarnos usaremos ucam1 & vfMm37
  public user;
  public password;

  //constructor(){}
  constructor( private apiConectionService: ApiConectionService ) { }
  //constructor( private router: Router, private apiConectionService: ApiConectionService ) { }

  ngOnInit() {
  }

  onLogInClick() {
    /*
    Esta función gestiona el evento click en el botón de Iniciar Sesión.
    Una vez autenticado el usuario creará un token de usuario en memoria.
    Tras esto redirigirá al menú de gestión.
    */
    this.apiConectionService.logIn( this.user, this.password ).subscribe(
      data => {let token = data['token'];
      localStorage.setItem('userToken',token);
      //La redirección al menú de gestión aún no está implementada.
      //this.router.navigate(["/menu"]);
      }
    );
    
  }

}
