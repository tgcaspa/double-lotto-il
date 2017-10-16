import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MdSnackBarModule } from "@angular/material";

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { ConfigServerUrlsService } from "../../config/server-urls.service";
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PageNotificationService } from "./services/page-notification.service";

import { LayoutModule } from "./components/layout/layout.module";
import { HttpModule } from "@angular/http";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule,
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