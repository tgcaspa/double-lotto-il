import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { ResultsComponent } from "./results.component";
import { ResultsService } from "../../services/results.service";
import { CompareDialogComponent } from "./compare-dialog/compare-dialog.component";
import { JoinPipeModule } from "../../pipes/join.pipe";
import { UserResultsComponent } from "./user-results/user-results.component";
import { PaisResultComponent } from "./pais-result/pais-result.component";
import { AlertModule, BsDropdownModule } from "ngx-bootstrap";
import { MdDialogModule, MdProgressBarModule } from "@angular/material";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ReactiveFormsModule } from "@angular/forms";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        ResultsComponent,
        UserResultsComponent,
        CompareDialogComponent,
        PaisResultComponent
    ],
    entryComponents: [
        CompareDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdProgressBarModule,
        MdDialogModule,
        JoinPipeModule,
        AngularFontAwesomeModule,
        BsDropdownModule.forRoot(),
        AlertModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        RouterModule.forChild([
            {
                path: '',
                component: ResultsComponent
            }
        ])
    ],
    providers: [
        ResultsService
    ]
})
export class ResultsModule {}
