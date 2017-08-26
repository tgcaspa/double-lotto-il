import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppRouting } from './app.routes';

import { AppComponent } from './app.component';
import { LottoTableComponent } from './components/lotto-table/lotto-table.component';
import { MainHeaderComponent } from './components/layout/header/main-header/main-header.component';
import { ResultsComponent } from './components/results/results.component';
import { LottoSaveModalComponent } from './components/lotto-save-modal/lotto-save-modal.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { JoinPipe } from './components/lotto-save-modal/join.pipe';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { MdMenuModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent,
        LottoTableComponent,
        MainHeaderComponent,
        ResultsComponent,
        LottoSaveModalComponent,
        JoinPipe,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AppRouting,
        ModalModule.forRoot(),
        AngularFontAwesomeModule,
        BrowserAnimationsModule,
        MdMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}