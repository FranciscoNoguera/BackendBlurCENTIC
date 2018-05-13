import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-game-item',
  templateUrl: './create-game-item.component.html',
  styleUrls: ['./create-game-item.component.css']
})
export class CreateGameItemComponent implements OnInit {
  public id: string;
  public time: number;
  public clue: string;
  public solution: string;
  public letters: string;
  public imageURL: string;
  public publish: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
