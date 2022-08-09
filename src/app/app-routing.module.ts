import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path:'Classes', loadChildren:()=>import('./class/class.module').then(m=>m.ClassModule)},
  
  {path:'',component:HomePageComponent},
  {path:'**',component:PageNotFoundComponent}
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
 
    exports: [RouterModule]
  })
export class AppRoutingModule { }
