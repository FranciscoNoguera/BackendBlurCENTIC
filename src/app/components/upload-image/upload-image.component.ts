import { Component, OnInit } from '@angular/core';
import {ApiConectionService} from '../../services/ApiConectionService/api-conection-service.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  public name;
  imageFile;

  constructor(private apiConnection: ApiConectionService ) { }

  ngOnInit() {
  }

  //Hay que pasar el nombre y la imágen;
  uploadImage(imageFile){
    this.imageFile  = this.apiConnection.uploadImage(this.imageFile);
    console.log(imageFile);
  }

}
