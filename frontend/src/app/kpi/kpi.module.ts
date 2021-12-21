import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiComponent } from './kpi.component';
import { LayoutModule } from '../shared/modules/layout.module';


@NgModule({
  declarations: [
    KpiComponent
  ],
  imports: [
    CommonModule,
    KpiRoutingModule,  
    LayoutModule  
  ],
  exports:[
    KpiComponent
  ]
})
export class KpiModule { }
