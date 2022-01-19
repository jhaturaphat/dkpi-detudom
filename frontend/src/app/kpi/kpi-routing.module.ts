import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KpiComponent } from './kpi.component';
import { KpiUrl } from '../url';
import { GroupkpiComponent } from './components/indicator/groupkpi/groupkpi.component';
import { TypekpiComponent } from './components/indicator/typekpi/typekpi.component';
import { NamekpiComponent } from './components/indicator/namekpi/namekpi.component';
import { KpiTemplateComponent } from './components/kpi-template/kpi-template.component';
import { DepcareComponent } from './components/depcare/depcare.component';

import { KpiScoreComponent } from './components/kpi-score/kpi-score.component';

const routes: Routes = [
  { path: '', component: KpiComponent },
  { path: KpiUrl.Dashboard, component: KpiComponent },
  { path: KpiUrl.Group, component: GroupkpiComponent },
  { path: KpiUrl.Type, component: TypekpiComponent },
  { path: KpiUrl.Name, component: NamekpiComponent },
  { path: KpiUrl.KpiTemplate, component: KpiTemplateComponent },
  { path: KpiUrl.DepCare, component: DepcareComponent },
  { path: KpiUrl.KpiScore, component: KpiScoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiRoutingModule { }
