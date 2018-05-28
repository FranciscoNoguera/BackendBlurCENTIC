import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Card } from './../../interfaces/Card';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { isEmpty } from 'rxjs/operators';
import { BASE_URL } from './../../app.constants';
import { Ng2ImgToolsService } from 'ng2-img-tools';


@Component({
  selector: 'app-create-game-item',
  templateUrl: './create-game-item.component.html',
  styleUrls: ['./create-game-item.component.css']
})
export class CreateGameItemComponent implements OnInit {
  public time: number;
  public clue: string;
  public solution: string;
  public extraLetters: string;
  public imageURL: string;
  public publish: boolean;

  public displayURL: string;
  public success: boolean = false;
  public selectedFile: File;
  private isImageNotSet: boolean = true;
  
  
  constructor(private apiConnectionService: ApiConectionService, private crop: Ng2ImgToolsService) { }

  ngOnInit() {
    this.displayURL = "../../../assets/images/imgNotFound.png"
  }

  isStringDefined(text: string): boolean {
    /*
    Esta función comprueba si un string se encuentra sin definir o contiene únicamente espacios en
    blanco. En caso afirmativo devuelve true. Si el string cumple estas restricciones devuelve
    false
    */
    if(text === undefined){
      return true;
    } else {
      if(text.replace(/\s/g, '').length === 0){
        return true;
      }
    }
    return false; 
  }

  onSelection(event){
    /*
    Esta función detecta si selecciona una imágen y la sube al Api y fija el valor
    imageURL en la dirección devuelta por esta
    */
   this.selectedFile = <File> event.target.files[0];
   this.crop.resizeExactCrop([this.selectedFile], 500, 500).subscribe(croppedImage =>{
    const file = new FormData();
    file.append('file',croppedImage ,this.selectedFile.name);
    this.apiConnectionService.uploadFile(file).map(response => response.json()).subscribe(data => {
      this.imageURL = data['file'];
      this.displayURL = BASE_URL + this.imageURL;
      this.isImageNotSet = false;
    }), err => { console.log(err); }
   }), err2 => {  console.log(err2); }
  }

  onSubmit(){
    /*
    Esta función comprueba que los campos de la tarjeta sean correctos. Para esto hace uso de la 
    variable errorCheck, en caso de que un campo sea incorrecto su valor se cambia a false.
    Si al final de la ejecución su valor es true se enviará la tarjeta al API.
    */
    let errorCheck: boolean = true;
    if(this.isStringDefined(this.solution)){
      errorCheck = false;
      console.log("Solución incorrecta");
    }
    if(this.isStringDefined(this.clue)){
      errorCheck = false;
      console.log("Pista incorrecta");
    }
    if(this.isImageNotSet){
      errorCheck = false;
      console.log("Se debe suministrar una imágen");
    }
    if(this.isStringDefined(this.solution)){
      this.solution = '';
    }
    if(this.isStringDefined(this.extraLetters)){
      this.extraLetters = '';
    }
    if(this.time === undefined || this.time === null){ //Si time no se encuentra definido o carece de valor se le asigna 60
      this.time = 60;
    }
    if(this.publish === undefined){ //Si publish no se encuentra definido le asigna el valor false.
      this.publish = false;
    }

    this.success = false;
    if(errorCheck){
      this.apiConnectionService.uploadCard(this.time,this.clue, this.solution, this.solution + this.extraLetters, this.imageURL, this.publish)
        .subscribe(data => {
          console.log("Retorno: ", data);
        }), err => {
          console.log(err);
        };
      this.success = true;
    }
  }


}
