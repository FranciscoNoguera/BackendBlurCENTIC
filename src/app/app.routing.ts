import { FormLoginComponent } from './components/form-login/form-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameItemComponent } from './components/create-game-item/create-game-item.component';
import { HomeComponent } from './components/home/home.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';


export const ROUTES: Routes = [
    {path: 'login', component: FormLoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'new_card', component: CreateGameItemComponent},
    {path: 'list_cards', component: ListCardsComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
