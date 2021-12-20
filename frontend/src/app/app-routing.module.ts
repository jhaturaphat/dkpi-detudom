import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { GroupComponent } from './indicators/group/group.component';
import { NameComponent } from './indicators/name/name.component';
import { TypeComponent } from './indicators/type/type.component';

const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'indicator',children:[
    { path:'group', component:GroupComponent },
    { path:'type', component:TypeComponent },
    { path:'name', component:NameComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppRoutingComponent = [
  LoginComponent, 
  DashboardComponent
]
