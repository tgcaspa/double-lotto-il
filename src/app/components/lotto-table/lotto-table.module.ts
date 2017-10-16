import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MdDialogModule, MdProgressBarModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { AlertModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { JoinPipeModule } from "../../pipes/join.pipe";
import { ResultsService } from "../../services/results.service";
import { LottoTableComponent } from "./lotto-table.component";
import { SaveDialogComponent } from "./save-dialog/save-dialog.component";

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
        TranslateModule,
        AlertModule.forRoot(),
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