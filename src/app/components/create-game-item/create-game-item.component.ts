import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Card } from './../../interfaces/Card';
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

  public errorMessage: string = '';
  public selectedFile: File;
  
  constructor(private apiConnectionService: ApiConectionService) { }

  ngOnInit() {
  }

  onSelection(event){
    /*
    Esta función detecta si selecciona una imágen y la sube al Api y fija el valor
    imageURL en la dirección devuelta por esta
    */
    this.selectedFile = <File> event.target.files[0];
    const file = new FormData();
    file.append('file',this.selectedFile ,this.selectedFile.name);
    this.apiConnectionService.uploadFile(file).map(response => response.json()).subscribe(data => {
      this.imageURL = "https://gameserver.centic.ovh" + data['file'];
    }), err => {
      console.log(err);
    }
  }


  onSubmit(){
/*
    if(this.id === ''){
      this.errorMessage = "Error: complete el campo Id.";
    } else if (this.clue === ''){
      this.errorMessage = "Error: complete el campo pista.";
    } else if (this.solution === ''){
      this.errorMessage = "Error: complete el campo solución.";
    } else if (this.letters === ''){
      this.errorMessage = "Error: complete el campo ñetras del teclado.";
    } else if (this.imageURL === ''){
      this.errorMessage = "Error: debe añadir una imágen.";
    } else {
    }
*/
    //Sentencia para enviar la tarjeta
    //this.apiConnectionService.uploadCard(this.id, this.time,this.clue, this.solution, this.letters, this.imageURL, this.publish);
   

  }

}
