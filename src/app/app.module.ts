import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormsModule } from '@angular/forms';
import { ApiConectionService } from './services/ApiConectionService/api-conection-service.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ApiConectionService,
    HttpClient,
    HttpHeaders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
