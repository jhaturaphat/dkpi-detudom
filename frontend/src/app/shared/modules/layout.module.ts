import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { MenuLeftComponent } from '../layout/menu-left/menu-left.component';
import { ToggleMenuDirective } from 'src/app/directives/toggle-menu.directive';




@NgModule({
  declarations: [
    HeaderComponent,
    MenuLeftComponent,
    ToggleMenuDirective
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
