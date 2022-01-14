import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppRoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/modules/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AppRoutingComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule, 
    LayoutModule, BrowserAnimationsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
