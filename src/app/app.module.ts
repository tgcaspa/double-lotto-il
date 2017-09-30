import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { ConfigServerUrlsService } from "../../config/server-urls.service";
import { LayoutModule } from "./components/layout/layout.module";
import { MdSnackBarModule } from "@angular/material";
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PageNotificationService } from "./services/page-notification.service";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { RouterModule } from "@angular/router";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        SnackBarComponent
    ],
    entryComponents: [
        SnackBarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        LayoutModule,
        MdSnackBarModule,
        AppRoutingModule
    ],
    providers: [
        ConfigServerUrlsService,
        PageNotificationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}