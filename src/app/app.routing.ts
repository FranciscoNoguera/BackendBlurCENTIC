import { FormLoginComponent } from './components/form-login/form-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameItemComponent } from './components/create-game-item/create-game-item.component';
import { HomeComponent } from './components/home/home.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { MainComponent } from './components/main/main.component';
import { DeleteByIdComponent } from './components/delete-by-id/delete-by-id.component';

export const ROUTES: Routes = [
    {path: 'login', component: FormLoginComponent},
    {path: 'home', component: HomeComponent, children:[
        {path: 'main', component: MainComponent},
        {path: 'new_card', component: CreateGameItemComponent},
        {path: 'list_cards', component: ListCardsComponent},
        {path: 'delete-by-id', component: DeleteByIdComponent},
        {path: '', redirectTo: 'main', pathMatch: 'full'},
        {path: '**', redirectTo: 'main', pathMatch: 'full'}
    ]},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
