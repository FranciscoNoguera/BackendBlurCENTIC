/**
 * Este componente permite eliminar mediante el uso de un Id una tajeta almacenada en el API de CENTIC
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
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

  constructor(private apiConectionService: ApiConectionService, private router: Router ) { }

  ngOnInit() {
  }

  eliminar(){
    /*
    Esta función elimina la tarjeta seleccionada.
    */
    this.apiConectionService.removeCard(this.id);
    this.router.navigateByUrl('home/list_cards');
  }

}
