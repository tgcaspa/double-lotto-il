import { Component, OnInit } from '@angular/core';
import { ResultModel } from "../../models/result";
import { ResultsService } from "../../services/results.service";
import { JoinPipe } from "../../pipes/join.pipe";

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    providers: [JoinPipe]
})
export class ResultsComponent implements OnInit {

    paisLastResult: ResultModel;
    userResultsVisible: boolean;

    constructor(private resultsSvc: ResultsService) {
    }

    ngOnInit() {
        this.userResultsVisible = false;
        this.initPaisResults();
    }

    initPaisResults() {
        // last Pais results
        this.resultsSvc
            .paisLastResult
            .subscribe((result: ResultModel) => {
                this.paisLastResult = result;
            });
    }

    showUserResults($event: Event) {
        debugger;
        // TODO: get user's results by password & phone
        this.userResultsVisible = true;
    }
}
