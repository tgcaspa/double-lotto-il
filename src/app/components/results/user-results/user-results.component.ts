import { Component, Input } from '@angular/core';
import { ResultModel } from "../../../models/result";
import { UserModel } from "../../../models/user";
import { ResultsService } from "../../../services/results.service";
import { UserResultModel } from "../../../models/user-result";

declare let _: any;

@Component({
    selector: 'app-user-results',
    templateUrl: './user-results.component.html',
    styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent {

    @Input() paisResult: ResultModel;
    userResults: UserResultModel[];

    constructor(private resultsSvc: ResultsService) {
    }

    loadUserResults(user: UserModel) {
        this.userResults = null;

        let model = new ResultModel(user);
        model.lottery_id = this.paisResult.lottery_id;

        this.resultsSvc
            .getUserResults(model)
            .subscribe(
                (results: UserResultModel[]) => {
                    this.userResults = results;
                },
                (error) => {
                    this.userResults = [];
                    console.log(error);
                }
            );
    }

    isNumberMatched(collection: number[], n: number): boolean {
        return _.includes(collection, n);
    }

}