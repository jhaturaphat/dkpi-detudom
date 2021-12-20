import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupComponent } from './group/group.component';
import { TypeComponent } from './type/type.component';
import { NameComponent } from './name/name.component';
import { LayoutModule } from '../shared/modules/layout.module';
import { ContentComponent } from '../shared/layout/content/content.component';
import { AppComponent } from '../app.component';




@NgModule({
  declarations: [
    GroupComponent,
    TypeComponent,
    NameComponent,
     ContentComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports:[
     LayoutModule
  ],
  
})
export class IndicatorsModule { }
