import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppRouting } from './app.routes';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LottoTableComponent } from './components/lotto-table/lotto-table.component';
import { LayoutMainHeaderComponent } from './components/layout/header/main-header/main-header.component';
import { ResultsComponent } from './components/results/results.component';
import { SaveDialogComponent } from './components/lotto-table/save-dialog/save-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule, BsDatepickerModule, CollapseModule, ModalModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { LayoutSidebarComponent } from './components/layout/sidebar/sidebar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MdDialogModule, MdProgressBarModule } from "@angular/material";
import { ResultsService } from "./services/results.service";
import { HttpModule } from "@angular/http";
import { JoinPipe } from "./pipes/join.pipe";
import { UserResultsComponent } from './components/results/user-results/user-results.component';
import { ConfigServerUrlsService } from "../../config/server-urls.service";
import { CompareDialogComponent } from './components/results/compare-dialog/compare-dialog.component';

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
        SaveDialogComponent,
        JoinPipe,
        UserResultsComponent,
        CompareDialogComponent
    ],
    entryComponents: [
        SaveDialogComponent,
        CompareDialogComponent
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
        MdDialogModule,
        AppRouting,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ConfigServerUrlsService,
        ResultsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}