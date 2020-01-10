import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { isNil } from 'lodash';
import { Archive } from 'src/app/classes/archive';
import { ArchiveService } from 'src/app/services/archive.service';
import { ResultsService } from 'src/app/services/results.service';
import { PageNotificationService } from 'src/app/services/page-notification.service';
import { ResultModel } from 'src/app/models/result';

@Component({
    selector: 'app-archive-details',
    templateUrl: './archive-details.component.html',
    styleUrls: ['./archive-details.component.scss']
})
export class ArchiveDetailsComponent extends Archive {
    @Input('last-result') paisLastResult: ResultModel;
    @Input('direction') direction: number;
    @Input('show-date') set showDate(value: boolean) {
      this._showDate = isNil(value) ? true : value === true;
    }
    get showDate() {
      return this._showDate;
    }
    @Input('title') title: string;

    @Output() onArchiveIdSelected = new EventEmitter();

    constructor(protected fb: FormBuilder,
                protected archiveSvc: ArchiveService,
                protected resultsSvc: ResultsService,
                protected notifySvc: PageNotificationService) {
        super(fb);
    }

    // archiveIdSelected(lotteryId: number) {
    //   const lastId = this.paisLastResult.lotteryId;
    //   const weeks = lastId - lotteryId;
    //   const date = new Date(this.paisLastResult.timestamp);
    //   const timestamp = date.setDate(date.getDate() - (7 * weeks));

    //   this.selectedResultForm.patchValue(
    //     new ResultModel({ lotteryId, timestamp })
    //   );

    //   this.onArchiveIdSelected.next(lotteryId);
    // }

    archiveIdSelected(lotteryId: number) {
        this.resultsSvc
            .getResultsByIdFromPais(new ResultModel({lotteryId}))
            .subscribe(
                (result: ResultModel) => {
                    this.selectedResultForm.patchValue(result);
                    this.archiveSvc.onArchiveIdChanged$.next(this.selectedResultForm.getRawValue());
                },
                (err: Error) => {
                    this.notifySvc.set(err.message, 400).show();
                    this.selectedResultForm = null;
                    this.archiveSvc.onArchiveIdChanged$.next(null);
                }
            );
    }

}
