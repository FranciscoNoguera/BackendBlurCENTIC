import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
/*Servicios*/
import { ApiConectionService } from './services/ApiConectionService/api-conection-service.service';
/*Componentes*/
import { FormLoginComponent } from './components/form-login/form-login.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomeComponent } from './components/home/home.component';
/*Rutas*/
import { ROUTES } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    UploadImageComponent,
    NavigationBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ApiConectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
