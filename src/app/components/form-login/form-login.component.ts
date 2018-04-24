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

  constructor(){}
/*
  constructor( private router: Router, private apiConectionService: ApiConectionService ) { }
*/
  ngOnInit() {
  }

  onLogInClick() {
    
  }

}
