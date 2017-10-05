import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { LottoTableComponent } from "./lotto-table.component";
import { JoinPipeModule } from "../../pipes/join.pipe";
import { SaveDialogComponent } from "./save-dialog/save-dialog.component";
import { ResultsService } from "../../services/results.service";
import { AlertModule } from "ngx-bootstrap";
import { MdDialogModule, MdProgressBarModule } from "@angular/material";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ReactiveFormsModule } from "@angular/forms";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        LottoTableComponent,
        SaveDialogComponent
    ],
    entryComponents: [
        SaveDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        MdProgressBarModule,
        MdDialogModule,
        JoinPipeModule,
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
                component: LottoTableComponent
            }
        ])
    ],
    providers: [
        ResultsService
    ]
})
export class LottoTableModule {}