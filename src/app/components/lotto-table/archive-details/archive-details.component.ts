import { Component, SimpleChanges, OnChanges } from '@angular/core';
import { ResultModel } from '../../../models/result';
import { ArchiveDetailsComponent } from '../../archive-details/archive-details.component';

@Component({
    selector: 'app-lotto-table-archive-details',
    templateUrl: '../../archive-details/archive-details.component.html',
    styleUrls: [
      '../../archive-details/archive-details.component.scss',
      './archive-details.component.scss'
    ]
})
export class LottoTableArchiveDetailsComponent extends ArchiveDetailsComponent
                                               implements OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        if ('paisLastResult' in changes && this.paisLastResult instanceof ResultModel) {
          if ('direction' in changes) {
            this.paisLastResult.lotteryId = this.calcLastLotteryId(this.paisLastResult.lotteryId, this.direction);
            this.selectedResultForm.patchValue(this.paisLastResult);

            this.onArchiveIdSelected.next(this.selectedResultForm.get('lotteryId'));
          }
        }
    }

}
