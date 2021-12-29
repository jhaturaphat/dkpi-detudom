import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiComponent } from './kpi.component';
import { LayoutModule } from '../shared/modules/layout.module';

import { TypekpiComponent } from './components/indicator/typekpi/typekpi.component';
import { GroupkpiComponent } from './components/indicator/groupkpi/groupkpi.component';
import { NamekpiComponent } from './components/indicator/namekpi/namekpi.component';
import { KpiTemplateComponent } from './components/kpi-template/kpi-template.component';
import { DepResponsibleComponent } from './components/dep-responsible/dep-responsible.component';


@NgModule({
  declarations: [
    KpiComponent,    
    TypekpiComponent,
    GroupkpiComponent,
    NamekpiComponent,
    KpiTemplateComponent,
    DepResponsibleComponent,
  ],
  imports: [
    CommonModule,
    KpiRoutingModule,  
    LayoutModule  
  ],
  exports:[
    KpiComponent,
    KpiTemplateComponent,
    DepResponsibleComponent,
  ]
})
export class KpiModule { }
