/**
 * Este servicio implementa las comunicaciones http con el API de CENTIC
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { Router } from '@angular/router';
import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Card } from './../../interfaces/Card';
import { Component, OnInit } from '@angular/core';
import { BASE_URL } from './../../app.constants';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  public cards: Card[] = [];
  public altImageURL: string = "../../../assets/images/imgNotFound.png";

  constructor(private apiConectionService: ApiConectionService, private router: Router ) {
  }

  ngOnInit() {
    this.createArrayItems();
  }

  createArrayItems(){
    /*
    Esta función recupera las tarjetas del API y las guarda en el array cards.
    */
    this.cards = this.apiConectionService.getAllCards();
  }

  deleateById(id){
    /*
    Esta función elimina la tarjeta seleccionada.
    */
    this.apiConectionService.removeCard(this.cards[id]._id);
  }

  refresh(){
    /*
    Esta función refresca la página.
    */
    window.location.reload();
  }

  toggleVisibility(id){
    /*
    Esta función cambia la visibilidad de la tarjeta deleccionada. Es decir, si el valor publish de una tarjeta es true
    lo pone a false y viceversa.
    */
    this.apiConectionService.updateCard(this.cards[id]._id, this.cards[id].time, this.cards[id].clue, this.cards[id].solution, this.cards[id].letters, this.cards[id].imageURL, !this.cards[id].publish);
  }

  getImage(id){
    /*
    Esta función concatena la url de la imágen con la url base almacenada en app.constants.ts.
    */
    return BASE_URL + this.cards[id].imageURL;
  }

}
