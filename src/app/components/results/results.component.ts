import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultModel } from "../../models/result";
import { JoinPipe } from "../../pipes/join.pipe";
import { CompareDialogComponent } from "./compare-dialog/compare-dialog.component";
import { MdDialog } from "@angular/material";
import { UserResultsComponent } from "./user-results/user-results.component";
import { UserModel } from "../../models/user";
import { PaisResultComponent } from "./pais-result/pais-result.component";
import { ArchiveService } from "../../services/archive.service";

declare let _: any;

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
    providers: [JoinPipe]
})
export class ResultsComponent implements OnInit {

    @ViewChild(UserResultsComponent)
        uResultsComponent: UserResultsComponent;
    @ViewChild(PaisResultComponent)
        pResultsComponent: PaisResultComponent;
    userModel: IUser;
    paisLastResult: ResultModel;

    constructor(public dialog: MdDialog,
                private archiveSvc: ArchiveService) {}

    ngOnInit() {
        this.archiveSvc
            .onArchiveIdChanged$
            .subscribe((result: ResultModel) => {
                this.paisLastResult = result;
            });
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CompareDialogComponent, {
            data: {
                lottery_id: this.paisLastResult.lottery_id
            },
            direction: "rtl"
        });

        dialogRef.afterClosed().subscribe((user: IUser) => {
            this.userModel = null;
            if(user instanceof UserModel){
                this.userModel = user;
                this.uResultsComponent.loadUserResults(this.userModel);
            }
        });
    }

    reloadResults() {
        if(this.userModel instanceof UserModel){
            this.uResultsComponent.loadUserResults(this.userModel);
        }
    }

}