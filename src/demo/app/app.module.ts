import { BrowserModule } from '@angular/platform-browser';
import {ClassProvider, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {AaaComponent} from './components/aaa/aaa.component';
import {BbbComponent} from './components/bbb/bbb.component';
import {AppRoutingModule} from './app-routing.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AaaComponent,
    BbbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    <ClassProvider> {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
