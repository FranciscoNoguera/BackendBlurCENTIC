import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const ROUTES: Routes = [
    {path: '', component: FormLoginComponent},
    {path: 'home', component: UploadImageComponent}
    //,{path: '**', component: NotFoundComponent}
];
