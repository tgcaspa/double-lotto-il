import { Component, OnInit } from '@angular/core';
import { ResultModel } from "../../../models/result";
import { ResultsService } from "../../../services/results.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { PageNotificationService } from "../../../services/page-notification.service";

declare let _: any;

@Component({
    selector: 'app-pais-result',
    templateUrl: './pais-result.component.html',
    styleUrls: ['./pais-result.component.scss']
})
export class PaisResultComponent implements OnInit {

    archiveIdSubject = new BehaviorSubject<ResultModel>(null);

    readonly MAX_LAST_RESULTS = 3;

    paisLastResult: ResultModel;
    lottoArchiveList: number[];

    constructor(private resultsSvc: ResultsService,
                private notifySvc: PageNotificationService
    ) {}

    ngOnInit() {
        this.initPaisResults();
    }

    initPaisResults() {
        this.paisLastResult = null;
        // last Pais result
        this.resultsSvc
            .paisLastResult
            .subscribe(
                (result: ResultModel) => {
                    this.paisLastResult = result;
                    if(this.paisLastResult instanceof ResultModel) {
                        this.initLottoArchiveList();
                        this.archiveIdSubject.next(this.paisLastResult);
                    }
                },
                (response: Response) => {
                    this.notifySvc.set(response.text(), 400).show()
                }
            );
    }

    private initLottoArchiveList() {
        this.lottoArchiveList = [];
        const last_id:number = this.paisLastResult.lottery_id || 0;
        if(Number(last_id) > this.MAX_LAST_RESULTS) {
            const ltid = (last_id+1);
            this.lottoArchiveList = _.range((ltid - this.MAX_LAST_RESULTS), ltid)
                                     .reverse();
        }
    }

    archiveIdSelected(id: number) {
        this.paisLastResult = null;
        const obj = new ResultModel({lottery_id: id});
        this.resultsSvc
            .getResultsByIdFromPais(obj)
            .subscribe(
                (result: ResultModel) => {
                    this.paisLastResult = result;
                    this.archiveIdSubject.next(this.paisLastResult);
                },
                (response: Response) => {
                    this.notifySvc.set(response.text(), 400).show()
                }
            );
    }
}
