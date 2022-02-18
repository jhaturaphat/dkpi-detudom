import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppRoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/modules/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KpiModule } from './kpi/kpi.module';



@NgModule({
  declarations: [
    AppComponent,
    AppRoutingComponent,  
  ],
  imports: [
    BrowserModule,  
    BrowserAnimationsModule,
    AppRoutingModule, 
    LayoutModule,
    KpiModule     
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
