import { Component, Input, OnInit } from '@angular/core';
import { ResultModel } from "../../../models/result";
import { UserModel } from "../../../models/user";
import { ResultsService } from "../../../services/results.service";
import { ArchiveService } from "../../../services/archive.service";
import { UserResultModel } from "../../../models/user-result";
import { PageNotificationService } from "../../../services/page-notification.service";

declare let _: any;

@Component({
    selector: 'app-user-results',
    templateUrl: './user-results.component.html',
    styleUrls: ['./user-results.component.scss'],
    providers: [ResultsService]
})
export class UserResultsComponent implements OnInit {

    paisResult: ResultModel;
    userResults: UserResultModel[];

    constructor(private resultsSvc: ResultsService,
                private archiveSvc: ArchiveService,
                private notifySvc: PageNotificationService
    ) {}

    ngOnInit() {
        this.archiveSvc
            .onArchiveIdChanged$
            .subscribe((result: ResultModel) => {
                this.paisResult = result;
            });
    }

    loadUserResults(user: UserModel) {
        this.userResults = null;

        let model = new UserResultModel(user);
        model.lottery_id = this.paisResult.lottery_id;

        this.resultsSvc
            .getUserResults(model)
            .subscribe(
                (results: UserResultModel[]) => {
                    this.userResults = results;
                },
                (response: Response) => {
                    this.userResults = [];
                    this.notifySvc.set(response.text(), 400).show()
                }
            );
    }

    isNumberMatched(collection: number[], n: number): boolean {
        return _.includes(collection, n);
    }

}