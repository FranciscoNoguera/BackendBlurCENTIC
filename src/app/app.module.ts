import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/*Servicios*/
import { ApiConectionService } from './services/ApiConectionService/api-conection-service.service';
/*Componentes*/
import { FormLoginComponent } from './components/form-login/form-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiConectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
