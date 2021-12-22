import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../layout/header/header.component';
import { MenuLeftComponent } from '../layout/menu-left/menu-left.component';
import { ToggleMenuDirective } from 'src/app/directives/toggle-menu.directive';
import { ContentComponent } from '../layout/content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HeaderComponent,
    MenuLeftComponent,
    ContentComponent,
    ToggleMenuDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[    
    HttpClientModule,
    HeaderComponent,
    MenuLeftComponent,  
    ContentComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    
  ]
})
export class LayoutModule { }
