import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MdDialogModule, MdProgressBarModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import { AlertModule, BsDropdownModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { JoinPipeModule } from "../../pipes/join.pipe";
import { ResultsService } from "../../services/results.service";
import { LottoTableComponent } from "./lotto-table.component";
import { SaveDialogComponent } from "./save-dialog/save-dialog.component";
import { LottoTableArchiveDetailsComponent } from "./archive-details/archive-details.component";
import { ArchiveService } from "../../services/archive.service";

@NgModule({
    declarations: [
        LottoTableComponent,
        SaveDialogComponent,
        LottoTableArchiveDetailsComponent
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
        BsDropdownModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: LottoTableComponent
            }
        ])
    ],
    providers: [
        ResultsService,
        ArchiveService
    ]
})
export class LottoTableModule {}