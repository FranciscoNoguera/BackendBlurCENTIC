/**
 * Barra de navegación, implementa la reddirección al resto de componentes
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router,private apiConectionService: ApiConectionService) { }

  ngOnInit() {
  }

  redirectToHome(){
    /*
    Esta función redirecciona a main.
    */
    this.router.navigateByUrl('home/main');
  }

  redirectToListCards(){
    /*
    Esta función redirecciona a la página de listar tarjetas.
    */
    this.router.navigateByUrl('home/list_cards');
  }

  redirectToNewCard(){
    /*
    Esta función redirecciona a la página para crear nuevas tarjetas.
    */
    this.router.navigateByUrl('home/new_card');
  }

  closeSession(){
    /*
    Esta función cierra la sesión, para ello elimina el token de usuario almacenado en memoria y redirige a la página de Log In.
    */
    this.apiConectionService.logOut();
    this.router.navigateByUrl('login');
  }

}
