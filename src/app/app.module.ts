import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { ConfigServerUrlsService } from "../../config/server-urls.service";
import { LayoutModule } from "./components/layout/layout.module";
import { MdSnackBarModule } from "@angular/material";
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PageNotificationService } from "./services/page-notification.service";
import { RouterModule } from "@angular/router";

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