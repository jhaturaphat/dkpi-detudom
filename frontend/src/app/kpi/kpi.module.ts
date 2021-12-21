import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiComponent } from './kpi.component';
import { LayoutModule } from '../shared/modules/layout.module';
import { KpitemplateComponent } from './components/kpitemplate/kpitemplate.component';
import { TypekpiComponent } from './components/indicator/typekpi/typekpi.component';
import { GroupkpiComponent } from './components/indicator/groupkpi/groupkpi.component';
import { NamekpiComponent } from './components/indicator/namekpi/namekpi.component';


@NgModule({
  declarations: [
    KpiComponent,
    KpitemplateComponent,
    TypekpiComponent,
    GroupkpiComponent,
    NamekpiComponent,
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
