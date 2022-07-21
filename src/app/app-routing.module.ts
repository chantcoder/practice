import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './myComponent/about-us/about-us.component';
import { HeaderComponent } from './myComponent/header/header.component';
import { HomeComponent } from './myComponent/home/home.component';
import { LoginComponent } from './myComponent/login/login.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:LoginComponent,
  children:[
    {path:'header',component:HeaderComponent},
    {path:'home',component:HomeComponent},
    {path:'about-us',component:AboutUsComponent}
  ]},
  {path:'**',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
