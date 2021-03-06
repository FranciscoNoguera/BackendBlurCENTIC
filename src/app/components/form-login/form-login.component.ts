/**
 * Este componente gestiona la recogida de credenciales de usuario para
 * realizar la autenticación frente al API
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Component, OnInit } from '@angular/core';
import {ApiConectionService} from '../../services/ApiConectionService/api-conection-service.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  public user;
  public password;
  public logInState: boolean = true;

  constructor( private apiConectionService: ApiConectionService ) { }

  ngOnInit() {
  }

  onLogInClick() {
    /*
    Esta función gestiona el evento click en el botón de Iniciar Sesión.
    Una vez autenticado el usuario creará un token de usuario en memoria.
    Tras esto redirigirá al menú de gestión.
    */
    this.apiConectionService.logIn( this.user, this.password );
    this.apiConectionService.isLoggedIn();
  }
}
