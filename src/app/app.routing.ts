import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameItemComponent } from './components/create-game-item/create-game-item.component';
import { HomeComponent } from './components/home/home.component';


export const ROUTES: Routes = [
    {path: 'login', component: FormLoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'upload_image', component: UploadImageComponent},
    {path: 'new_card', component: CreateGameItemComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
