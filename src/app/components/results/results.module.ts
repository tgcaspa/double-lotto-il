import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ArchiveDetailsModule } from '../archive-details/archive-details.module';
import { JoinPipeModule } from '../../pipes/join.pipe';
import { ResultsService } from '../../services/results.service';
import { ArchiveService } from '../../services/archive.service';
import { ResultsComponent } from './results.component';
import { CompareDialogComponent } from './compare-dialog/compare-dialog.component';
import { UserResultsComponent } from './user-results/user-results.component';
import { PaisResultComponent } from './pais-result/pais-result.component';

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
        MatProgressBarModule,
        MatDialogModule,
        JoinPipeModule,
        TranslateModule,
        ArchiveDetailsModule,
        AlertModule.forRoot(),
        AngularFontAwesomeModule,
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
