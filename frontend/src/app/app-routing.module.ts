import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AppUrl } from './url';
const routes: Routes = [
  {path:'', redirectTo:AppUrl.Dashboard, pathMatch:'full'},
  {path:AppUrl.Login, component:LoginComponent},
  {path:AppUrl.Dashboard, component:DashboardComponent},
  {path:AppUrl.Kpi, loadChildren: ()=> import('./kpi/kpi.module').then(m=> m.KpiModule)},
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
