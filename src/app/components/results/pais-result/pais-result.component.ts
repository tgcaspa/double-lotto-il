import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultModel } from "../../../models/result";
import { ResultsService } from "../../../services/results.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { PageNotificationService } from "../../../services/page-notification.service";
import { ResultArchiveDetailsComponent } from "./archive-details/archive-details.component";
import { ArchiveService } from "../../../services/archive.service";

declare let _: any;

@Component({
    selector: 'app-pais-result',
    templateUrl: './pais-result.component.html',
    styleUrls: ['./pais-result.component.scss']
})
export class PaisResultComponent implements OnInit {
    @ViewChild(ResultArchiveDetailsComponent)
        archiveComponent: ResultArchiveDetailsComponent;
    paisLastResult: ResultModel;
    selectedResult: ResultModel;
    lottoArchiveList: number[];
    loadingPaisResults: boolean = false;

    constructor(private resultsSvc: ResultsService,
                private notifySvc: PageNotificationService,
                private archiveSvc: ArchiveService) {
        this.archiveSvc
            .onArchiveIdChanged$
            .subscribe((result: ResultModel) => {
                this.selectedResult = result;
            });
    }

    ngOnInit() {
        this.initPaisResults();
    }

    initPaisResults() {
        this.selectedResult = this.paisLastResult = null;
        // last Pais result
        this.resultsSvc
            .paisLastResult
            .subscribe((result: ResultModel) => {
                this.selectedResult = this.paisLastResult = result;
                this.archiveSvc.onArchiveIdChanged$.next(result);
            });
    }

    archiveIdSelected(status: boolean) {
        this.loadingPaisResults = status === true;
    }

}
