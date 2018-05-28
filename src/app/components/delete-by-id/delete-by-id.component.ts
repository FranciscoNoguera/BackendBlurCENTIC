import { Router } from '@angular/router';
import { Card } from './../../interfaces/Card';
import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-by-id',
  templateUrl: './delete-by-id.component.html',
  styleUrls: ['./delete-by-id.component.css']
})
export class DeleteByIdComponent implements OnInit {
  id: string;
  //enviado: boolean = false;
  //error: boolean = false;

  constructor(private apiConectionService: ApiConectionService, private router: Router ) { }

  ngOnInit() {
  }

  eliminar(){
    //this.error = this.apiConectionService.removeCard(this.id);
    //this.enviado = true;
    this.apiConectionService.removeCard(this.id);
    this.router.navigateByUrl('home/list_cards');
  }

}
