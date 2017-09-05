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

    paisResults: ResultModel;
    userResultsVisible: boolean;

    constructor(private resultsSvc: ResultsService) {
    }

    ngOnInit() {
        this.userResultsVisible = false;
        this.initPaisResults();
    }

    initPaisResults() {
        this.paisResults = new ResultModel();
        this.paisResults.lottery_id = 2932;
        this.paisResults.regular = [1, 3, 15, 26, 29, 36];
        this.paisResults.strong = [5];
        this.paisResults.timestamp = 1504047300000;
    }

    showUserResults($event: Event) {
        debugger;
        // TODO: get user's results by password & phone
        this.userResultsVisible = true;
    }
}
