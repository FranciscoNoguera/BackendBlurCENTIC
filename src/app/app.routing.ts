import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*Components*/
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomeComponent } from './components/home/home.component';


export const ROUTES: Routes = [
    {path: '', component: FormLoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'upload_image', component: UploadImageComponent}

    //,{path: '**', component: NotFoundComponent}
];
