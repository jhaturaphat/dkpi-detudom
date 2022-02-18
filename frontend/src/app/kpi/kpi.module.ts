import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiComponent } from './kpi.component';
import { LayoutModule } from '../shared/modules/layout.module';

import { TypekpiComponent } from './components/indicator/typekpi/typekpi.component';
import { GroupkpiComponent } from './components/indicator/groupkpi/groupkpi.component';
import { NamekpiComponent } from './components/indicator/namekpi/namekpi.component';
import { KpiTemplateComponent } from './components/kpi-template/kpi-template.component';
import { DepcareComponent } from './components/depcare/depcare.component';

import { KpiScoreComponent } from './components/kpi-score/kpi-score.component';
import { KeepScoreComponent } from './components/kpi-score/keep-score/keep-score.component';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    KpiComponent,    
    TypekpiComponent,
    GroupkpiComponent,
    NamekpiComponent,
    KpiTemplateComponent,
    DepcareComponent,    
    KpiScoreComponent, 
    KeepScoreComponent, 
    ChartComponent,
  ],
  imports: [
    CommonModule,
    KpiRoutingModule,  
    LayoutModule  
  ],
  exports:[
    KpiComponent,    
    TypekpiComponent,
    GroupkpiComponent,
    NamekpiComponent,
    KpiTemplateComponent,
    DepcareComponent,    
    KpiScoreComponent, 
    KeepScoreComponent, 
    ChartComponent,
  ]
})
export class KpiModule { }
