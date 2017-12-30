import { Component } from '@angular/core';
import { Archive } from "../../../../classes/archive";
import { ResultModel } from "../../../../models/result";
import { ResultsService } from "../../../../services/results.service";
import { PageNotificationService } from "../../../../services/page-notification.service";
import { ArchiveService } from "../../../../services/archive.service";

@Component({
    selector: 'app-archive-details',
    templateUrl: './archive-details.component.html',
    styleUrls: ['./archive-details.component.scss']
})
export class ResultArchiveDetailsComponent extends Archive {

    constructor(protected archiveSvc: ArchiveService,
                protected resultsSvc: ResultsService,
                protected notifySvc: PageNotificationService) {
        super();
    }

    archiveIdSelected(lottery_id: number) {
        // this.onArchiveIdSelected.next(true);
        this.resultsSvc
            .getResultsByIdFromPais(
                new ResultModel({lottery_id: lottery_id})
            )
            .subscribe(
                (result: ResultModel) => {
                    this.selectedResult = result;
                    this.archiveSvc.onArchiveIdChanged$.next(this.selectedResult);
                    // this.onArchiveIdSelected.next(false);
                },
                (response: Response) => {
                    this.notifySvc.set(response.text(), 400).show();
                    this.selectedResult = null;
                    this.archiveSvc.onArchiveIdChanged$.next(this.selectedResult);
                    // this.onArchiveIdSelected.next(false);
                }
            );
    }

}
