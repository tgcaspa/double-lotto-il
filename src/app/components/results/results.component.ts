import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultModel } from '../../models/result';
import { JoinPipe } from '../../pipes/join.pipe';
import { CompareDialogComponent } from './compare-dialog/compare-dialog.component';
import { UserResultsComponent } from './user-results/user-results.component';
import { UserModel } from '../../models/user';
import { PaisResultComponent } from './pais-result/pais-result.component';
import { ArchiveService } from '../../services/archive.service';
import { IUser } from 'src/app/interfaces/iuser.interface';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    providers: [JoinPipe]
})
export class ResultsComponent implements OnInit {

    @ViewChild(UserResultsComponent, { static: true })
    uResultsComponent: UserResultsComponent;

    @ViewChild(PaisResultComponent, { static: true })
    pResultsComponent: PaisResultComponent;

    userModel: IUser;
    paisLastResult: ResultModel;

    constructor(public dialog: MatDialog,
                private archiveSvc: ArchiveService) {}

    ngOnInit() {
        this.archiveSvc
            .onArchiveIdChanged$
            .subscribe((result: ResultModel) => {
                this.paisLastResult = result;
            });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CompareDialogComponent, {
            data: {
                lotteryId: this.paisLastResult.lotteryId
            },
            direction: 'rtl'
        });

        dialogRef.afterClosed().subscribe((user: IUser) => {
            this.userModel = null;
            if (user instanceof UserModel) {
                this.userModel = user;
                this.uResultsComponent.loadUserResults(this.userModel);
            }
        });
    }

    reloadResults() {
        if (this.userModel instanceof UserModel) {
            this.uResultsComponent.loadUserResults(this.userModel);
        }
    }

}
