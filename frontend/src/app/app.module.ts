import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppRoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/modules/layout.module';
import { ContentComponent } from './shared/layout/content/content.component';
import { ToggleMenuDirective } from './directives/toggle-menu.directive';
import { ToggleTreeviewDirective } from './directives/toggle-treeview.directive';
@NgModule({
  declarations: [
    AppComponent,
    AppRoutingComponent,
    ContentComponent,
    ToggleTreeviewDirective,
    // ToggleMenuDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, LayoutModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
