import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ResultsService } from 'src/app/services/results.service';
import { ArchiveService } from 'src/app/services/archive.service';
import { ArchiveDetailsComponent } from './archive-details.component';

@NgModule({
  declarations: [ArchiveDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularFontAwesomeModule,
    TranslateModule,
  ],
  exports: [
    ArchiveDetailsComponent,

    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [
    ResultsService,
    ArchiveService
  ]
})
export class ArchiveDetailsModule { }
