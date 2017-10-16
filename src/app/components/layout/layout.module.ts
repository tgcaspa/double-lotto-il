import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { CollapseModule } from "ngx-bootstrap";

import { LayoutMainHeaderComponent } from "./header/main-header/main-header.component";
import { LayoutSidebarComponent } from "./sidebar/sidebar.component";

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
        TranslateModule
    ],
    exports: [
        LayoutMainHeaderComponent,
        LayoutSidebarComponent
    ]
})
export class LayoutModule {}