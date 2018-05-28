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
    this.router.navigateByUrl('home/main');
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

  closeSession(){
    this.apiConectionService.logOut();
    this.router.navigateByUrl('login');
  }

}
