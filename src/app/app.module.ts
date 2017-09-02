import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppRouting } from './app.routes';

import { AppComponent } from './app.component';
import { LottoTableComponent } from './components/lotto-table/lotto-table.component';
import { LayoutMainHeaderComponent } from './components/layout/header/main-header/main-header.component';
import { ResultsComponent } from './components/results/results.component';
import { LottoSaveModalComponent } from './components/lotto-save-modal/lotto-save-modal.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule, CollapseModule, ModalModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { LayoutSidebarComponent } from './components/layout/sidebar/sidebar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import 'hammerjs';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MdProgressBarModule } from "@angular/material";
import { ResultsService } from "./services/results.service";
import { HttpModule } from "@angular/http";
import { CompareModalComponent } from './components/results/compare-modal/compare-modal.component';
import { JoinPipe } from "./pipes/join.pipe";
import { UserResultsComponent } from './components/results/user-results/user-results.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LottoTableComponent,
        LayoutMainHeaderComponent,
        LayoutSidebarComponent,
        ResultsComponent,
        LottoSaveModalComponent,
        JoinPipe,
        CompareModalComponent,
        UserResultsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFontAwesomeModule,
        MdProgressBarModule,
        AppRouting,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ResultsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}