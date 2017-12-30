import { Component, SimpleChanges } from '@angular/core';
import { Archive } from "../../../classes/archive";
import { ArchiveService } from "../../../services/archive.service";
import { ResultModel } from "../../../models/result";

@Component({
    selector: 'app-archive-details',
    templateUrl: './archive-details.component.html',
    styleUrls: ['./archive-details.component.scss']
})
export class LottoTableArchiveDetailsComponent extends Archive {

    constructor(protected archiveSvc: ArchiveService) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['paisLastResult'] && this.paisLastResult instanceof ResultModel) {
            this.selectedResult = this.paisLastResult;
            this.lottoArchiveList = this.getLottoArchiveList(this.paisLastResult.lottery_id, this._dir);
            this.onArchiveIdSelected.next(this.selectedResult.lottery_id);
        }
    }

    archiveIdSelected(lottery_id: number) {
        const last_id = this.paisLastResult.lottery_id;
        const weeks = last_id - lottery_id;
        const date = new Date(this.paisLastResult.timestamp);
        const timestamp = date.setDate(date.getDate()-(7*weeks));

        this.selectedResult = new ResultModel({
            lottery_id: lottery_id,
            timestamp: timestamp
        });

        this.onArchiveIdSelected.next(lottery_id);
    }

}
