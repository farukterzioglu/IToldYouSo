import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { IToldYouSoModule } from "./itolduso/itolduso.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IToldYouSoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
