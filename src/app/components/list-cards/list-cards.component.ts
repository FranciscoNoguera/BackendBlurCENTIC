import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Card } from './../../interfaces/Card';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  public cards: Card[];

  public imageURL: string = "../../../assets/images/imgNotFound.png";

  constructor(private apiConectionService: ApiConectionService) {
    //this.cards = this.apiConectionService.getAllCards();
  }

  ngOnInit() {
    console.log(this.apiConectionService.getAllCards());
  }

}
