import { FormsModule } from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';
import {ApiConectionService} from '../../services/ApiConectionService/api-conection-service.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  public selectedFile: File;
  public url: string;

  public imageURL: FormData;

  constructor(private apiConnection: ApiConectionService ) { }

  ngOnInit() {
  }

  onSelection(event){
    this.selectedFile = <File> event.target.files;
  }

  uploadImage(){
    const file = new FormData();
    file.append('file',this.selectedFile ,this.selectedFile.name);
    this.apiConnection.uploadFile(file).subscribe(data => {
      this.url = data['file'];
    }), err => {
      console.log(err);
    }
    console.log("URL imágen: ", this.url);
  }

}
