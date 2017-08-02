import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppRouting } from './app.routes';

import { AppComponent } from './app.component';
import { LottoTableComponent } from './components/lotto-table/lotto-table.component';
import { MainHeaderComponent } from './components/layout/header/main-header/main-header.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    LottoTableComponent,
    MainHeaderComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
