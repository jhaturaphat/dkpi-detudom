import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { MenuLeftComponent } from '../layout/menu-left/menu-left.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuLeftComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    MenuLeftComponent
  ]
})
export class LayoutModule { }
