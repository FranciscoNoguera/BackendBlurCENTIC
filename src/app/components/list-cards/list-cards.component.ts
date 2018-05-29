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
    this.cards = this.apiConectionService.getAllCards();
  }

  deleateById(id){
    this.apiConectionService.removeCard(this.cards[id]._id);
  }

  refresh(){
    window.location.reload();
  }

  toggleVisibility(id){
    this.apiConectionService.updateCard(this.cards[id]._id, this.cards[id].time, this.cards[id].clue, this.cards[id].solution, this.cards[id].letters, this.cards[id].imageURL, !this.cards[id].publish);
  }

  getImage(id){
    return BASE_URL + this.cards[id].imageURL;
  }

}
