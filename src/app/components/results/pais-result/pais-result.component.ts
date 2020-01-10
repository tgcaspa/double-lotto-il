import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs/operators';
import { ResultModel } from '../../../models/result';
import { ResultsService } from '../../../services/results.service';
import { ArchiveService } from '../../../services/archive.service';
import { ArchiveDetailsComponent } from '../../archive-details/archive-details.component';

@Component({
    selector: 'app-pais-result',
    templateUrl: './pais-result.component.html',
    styleUrls: ['./pais-result.component.scss']
})
export class PaisResultComponent implements OnInit {
    @ViewChild(ArchiveDetailsComponent, {static: true})
    archiveComponent: ArchiveDetailsComponent;

    paisLastResult: ResultModel;
    selectedResult: ResultModel;
    lottoArchiveList: number[];
    loadingPaisResults = false;

    constructor(private resultsSvc: ResultsService,
                private archiveSvc: ArchiveService) {
        this.archiveSvc
            .onArchiveIdChanged$
            .pipe(untilDestroyed(this))
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
            .paisLastResult$
            .pipe(take(1))
            .subscribe((result: ResultModel) => {
                this.selectedResult = this.paisLastResult = result;
                this.archiveSvc.onArchiveIdChanged$.next(result);
            });
    }

    archiveIdSelected(status: boolean) {
        this.loadingPaisResults = status === true;
    }

}
