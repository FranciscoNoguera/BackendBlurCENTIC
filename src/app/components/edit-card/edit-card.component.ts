/**
 * Este componente permite editar una tarjeta de juego
 * @author Francisco Noguera Fuentes
 * @version 1.0
 */
import { ApiConectionService } from './../../services/ApiConectionService/api-conection-service.service';
import { Card } from './../../interfaces/Card';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { isEmpty } from 'rxjs/operators';
import { BASE_URL } from './../../app.constants';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
  private _id: string;

  public time: number;
  public clue: string;
  public solution: string;
  public extraLetters: string;
  public imageURL: string;
  public publish: boolean;

  public displayURL: string;
  public success: boolean = false;
  public selectedFile: File;
  
  private tickTime: number;

  constructor(private apiConnectionService: ApiConectionService, private crop: Ng2ImgToolsService, private router: Router) {
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit() {
    this._id = localStorage.getItem('editCardId');
    localStorage.removeItem('editCardId');
    this.apiConnectionService.getCard(this._id).subscribe(info => {
      var aux = JSON.parse(info['_body']);
      this._id = aux['_id'];
      this.time = aux['time'];
      this.clue = aux['clue'];
      this.solution = aux['solution'];
      this.extraLetters = aux['letters'];
      this.imageURL = aux['imageURL'];
      this.displayURL = BASE_URL + aux['imageURL'];
      this.publish = aux['publish'];
    });
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
    }), err => { this.router.navigateByUrl('home/error'); }
   }), err2 => {  this.router.navigateByUrl('home/error'); }
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
      let card: Card = {
        "_id": this._id,
        "time": this.time,
        "clue": this.clue,
        "solution": this.solution.toUpperCase(),
        "imageURL": this.imageURL,
        "publish": this.publish
      };
      this.apiConnectionService.updateCard(card).subscribe(), err => {
        this.router.navigateByUrl('home/error');
      };
        this.tickTime = 3;
        this.success = true;
    }
  }

  private tick(): void{
    /*
    Función contedor de tiempo para determinar cuanto tiempo se muestran las alertas.
    */
    if((this.tickTime > 0) && (this.success)){
      this.tickTime--;
    } else if((this.tickTime <= 0) && (this.success)){
      this.success = false;
    }
  }

}
