import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LayoutMainHeaderComponent } from './components/layout/header/main-header/main-header.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule, BsDropdownModule, CollapseModule, ModalModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { LayoutSidebarComponent } from './components/layout/sidebar/sidebar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MdDialogModule, MdProgressBarModule } from "@angular/material";
import { HttpModule } from "@angular/http";
import { ConfigServerUrlsService } from "../../config/server-urls.service";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LayoutMainHeaderComponent,
        LayoutSidebarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFontAwesomeModule,
        MdProgressBarModule,
        MdDialogModule,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    providers: [
        ConfigServerUrlsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}