import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../layout/header/header.component';
import { MenuLeftComponent } from '../layout/menu-left/menu-left.component';
import { ToggleMenuDirective } from 'src/app/directives/toggle-menu.directive';
import { ContentComponent } from '../layout/content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ngx-boostrap
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IconPipe } from 'src/app/pipes/icon.pipe';

// Chartjs
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuLeftComponent,
    ContentComponent,
    ToggleMenuDirective,
    IconPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgChartsModule
  ],
  exports:[   
    IconPipe, 
    HttpClientModule,
    HeaderComponent,
    MenuLeftComponent,  
    ContentComponent,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule,
    TabsModule,
    BsDropdownModule,
    ModalModule,
    NgChartsModule
  ],
  providers:[
    
  ]
})
export class LayoutModule { }
