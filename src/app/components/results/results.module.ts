import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MdDialogModule, MdProgressBarModule } from "@angular/material";
import { AlertModule, BsDropdownModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { JoinPipeModule } from "../../pipes/join.pipe";
import { ResultsService } from "../../services/results.service";
import { ArchiveService } from "../../services/archive.service";
import { ResultsComponent } from "./results.component";
import { CompareDialogComponent } from "./compare-dialog/compare-dialog.component";
import { UserResultsComponent } from "./user-results/user-results.component";
import { PaisResultComponent } from "./pais-result/pais-result.component";
import { ResultArchiveDetailsComponent } from "./pais-result/archive-details/archive-details.component";

@NgModule({
    declarations: [
        ResultsComponent,
        UserResultsComponent,
        CompareDialogComponent,
        PaisResultComponent,
        ResultArchiveDetailsComponent
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
        TranslateModule,
        RouterModule.forChild([
            {
                path: '',
                component: ResultsComponent
            }
        ])
    ],
    providers: [
        ResultsService,
        ArchiveService
]
})
export class ResultsModule {}
