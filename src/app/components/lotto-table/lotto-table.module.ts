import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { AlertModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { JoinPipeModule } from '../../pipes/join.pipe';
import { ResultsService } from '../../services/results.service';
import { LottoTableComponent } from './lotto-table.component';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { ArchiveService } from '../../services/archive.service';
import { LottoTableArchiveDetailsComponent } from './archive-details/archive-details.component';
import { ArchiveDetailsModule } from '../archive-details/archive-details.module';
import { LottoTableFormBuilderComponent } from './form-builder/form-builder.component';

@NgModule({
    declarations: [
        LottoTableComponent,
        SaveDialogComponent,
        LottoTableArchiveDetailsComponent,
        LottoTableFormBuilderComponent
    ],
    entryComponents: [
        SaveDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        MatProgressBarModule,
        MatDialogModule,
        MatMenuModule,
        JoinPipeModule,
        TranslateModule,
        AlertModule.forRoot(),
        ArchiveDetailsModule,
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
