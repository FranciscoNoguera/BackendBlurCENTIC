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
    this.router.navigateByUrl('home/list_cards');
  }

  redirectToNewCard(){
    this.router.navigateByUrl('home/new_card');
  }

  redirectToDeleteById(){
    this.router.navigateByUrl('home/delete-by-id');
  }

}
