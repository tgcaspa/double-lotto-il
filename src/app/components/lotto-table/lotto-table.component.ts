import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResultModel } from '../../models/result';
import { ResultsService } from '../../services/results.service';
import { PageNotificationService } from '../../services/page-notification.service';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { LottoTableFormBuilderComponentRef, IFormResults } from './form-builder/models/form-builder';
import { IResult } from 'src/app/interfaces/iresult.interface';
import { ISaveDialogData } from './save-dialog/models/save-dialog';

@Component({
    selector: 'app-lotto-table',
    templateUrl: './lotto-table.component.html',
    styleUrls: ['./lotto-table.component.scss']
})
export class LottoTableComponent implements OnInit {
    @ViewChild(LottoTableFormBuilderComponentRef, {static: false})
    formBuilder: LottoTableFormBuilderComponentRef;

    paisLastResult$: Observable<ResultModel>;
    nextPaisLotteryId: number;
    pageMessage: string;

    constructor(private dialog: MatDialog,
                private resultsSvc: ResultsService,
                private notifySvc: PageNotificationService) {}

    ngOnInit(): void {
      // last Pais result
      this.paisLastResult$ = this.resultsSvc.paisLastResult$;
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(SaveDialogComponent, {
        data: this.prepareSaveData(this.formBuilder.getValue()),
        maxWidth: '90vw'
      });

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((result: boolean) => {
          if (result === true) {
              // init clean table
              this.formBuilder.initTable();

              this.notifySvc
                  .set('The numbers have been saved successfully', 200)
                  .show();
          }
      });
    }

    prepareSaveData(data: IFormResults[]): ISaveDialogData {
      return {
        lotteryId: this.nextPaisLotteryId,
        results: data.map(result =>
          new ResultModel({
            lotteryId: this.nextPaisLotteryId,
            ...result
          })
        )
      };
    }

    archiveIdSelected(lotteryId: number): void {
      this.nextPaisLotteryId = lotteryId;
    }

}
