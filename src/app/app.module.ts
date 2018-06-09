import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
/*Servicios*/
import { ApiConectionService } from './services/ApiConectionService/api-conection-service.service';
/*Componentes*/
import { FormLoginComponent } from './components/form-login/form-login.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CreateGameItemComponent } from './components/create-game-item/create-game-item.component';
import {HomeComponent} from './components/home/home.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { MainComponent } from './components/main/main.component';
import { DeleteByIdComponent } from './components/delete-by-id/delete-by-id.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { ErrorComponent } from './components/error/error.component';
/*Rutas*/
import { ROUTES } from './app.routing';
import { AuthGuard } from './app.security';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    NavigationBarComponent,
    CreateGameItemComponent,
    HomeComponent,
    ListCardsComponent,
    MainComponent,
    DeleteByIdComponent,
    EditCardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    Ng2ImgToolsModule
  ],
  providers: [
    ApiConectionService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
