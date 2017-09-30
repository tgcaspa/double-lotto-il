import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CollapseModule } from "ngx-bootstrap";
import { LayoutMainHeaderComponent } from "./header/main-header/main-header.component";
import { LayoutSidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule } from "@angular/router";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        LayoutMainHeaderComponent,
        LayoutSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AngularFontAwesomeModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFontAwesomeModule,
        CollapseModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        LayoutMainHeaderComponent,
        LayoutSidebarComponent
    ]
})
export class LayoutModule {}