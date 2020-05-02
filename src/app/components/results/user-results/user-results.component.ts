import { Component, OnInit } from '@angular/core';
import { includes } from 'lodash';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs/operators';
import { ResultModel } from '../../../models/result';
import { UserModel } from '../../../models/user';
import { ResultsService } from '../../../services/results.service';
import { ArchiveService } from '../../../services/archive.service';
import { UserResultModel } from '../../../models/user-result';
import { PageNotificationService } from '../../../services/page-notification.service';

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
                private notifySvc: PageNotificationService) {}

    ngOnInit() {
        this.archiveSvc
            .onArchiveIdChanged$
            .pipe(untilDestroyed(this))
            .subscribe((result: ResultModel) => {
                this.paisResult = result;
            });
    }

    loadUserResults(user: UserModel) {
        this.userResults = [];

        const model = new UserResultModel(user);
        model.lotteryId = this.paisResult.lotteryId;

        this.resultsSvc
            .getUserResults(model)
            .pipe(take(1))
            .subscribe(
                (results: UserResultModel[]) => this.userResults = results,
                (err: Error) => this.notifySvc.set(err.message, 400).show()
            );
    }

    isNumberMatched(collection: number[], n: number): boolean {
        return includes(collection, n);
    }

}
