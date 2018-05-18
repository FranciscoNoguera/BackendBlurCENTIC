import { BASE_URL } from './../../app.constants';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';
import {ApiConectionService} from '../../services/ApiConectionService/api-conection-service.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Ng2ImgToolsService } from 'ng2-img-tools';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  public selectedFile: File;
  public url: string;

  public imageURL: FormData;

  constructor(private apiConnection: ApiConectionService, private crop: Ng2ImgToolsService ) { }

  ngOnInit() {
  }

  onSelection(event){
    this.selectedFile = <File> event.target.files[0];
  }

  uploadImage(){

    this.crop.resizeExactCrop([this.selectedFile], 500, 500).subscribe(croppedImage =>{
      const file = new FormData();
      file.append('file',croppedImage ,this.selectedFile.name);
      this.apiConnection.uploadFile(file).map(response => response.json()).subscribe(data => {
        this.url = BASE_URL + data['file'];
      }), err => {
        console.log(err);
      }
    }), err2 => {
      console.log(err2);
    }

/*
    const file = new FormData();
    file.append('file',this.selectedFile ,this.selectedFile.name);
    this.apiConnection.uploadFile(file).map(response => response.json()).subscribe(data => {
      this.url = BASE_URL + data['file'];
    }), err => {
      console.log(err);
    }*/
  }

}
