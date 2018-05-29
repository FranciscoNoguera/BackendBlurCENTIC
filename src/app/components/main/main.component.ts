/**
 * Este servicio implementa las comunicaciones http con el API de CENTIC
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  redirectToListCards(){
    /*
    Esta función redirecciona a la página de listar tarjetas
    */
    this.router.navigateByUrl('home/list_cards');
  }

  redirectToNewCard(){
    /*
    Esta función redirecciona a la página para crear nuevas tarjetas
    */
    this.router.navigateByUrl('home/new_card');
  }

  redirectToDeleteById(){
    /*
    Esta función redirecciona a la página de eliminar tarjetas
    */
    this.router.navigateByUrl('home/delete-by-id');
  }

}
