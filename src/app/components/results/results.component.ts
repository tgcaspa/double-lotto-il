import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultModel } from "../../models/result";
import { ResultsService } from "../../services/results.service";
import { JoinPipe } from "../../pipes/join.pipe";
import { CompareDialogComponent } from "./compare-dialog/compare-dialog.component";
import { MdDialog } from "@angular/material";
import { UserResultsComponent } from "./user-results/user-results.component";
import { UserModel } from "../../models/user";

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
    userResultsVisible: boolean;
    paisLastResult: ResultModel;
    datePicker = {
        maxDate: null,
        lastPaisDate: null
    };
    get lastPaisDate(): Date {
        return this.datePicker.lastPaisDate;
    }
    set lastPaisDate(v: Date) {
        this.datePicker.lastPaisDate = v;
        this.paisLastResult.timestamp = Date.parse(`${v}`);
    }

    constructor(private resultsSvc: ResultsService,
                public dialog: MdDialog) {
        this.userResultsVisible = false;
    }

    ngOnInit() {
        this.initPaisResults();
    }

    initPaisResults() {
        this.paisLastResult = null;
        // last Pais result
        this.resultsSvc
            .paisLastResult
            .subscribe((result: ResultModel) => {
                if(result instanceof ResultModel) {
                    this.paisLastResult = result;
                    this.lastPaisDate = new Date(this.paisLastResult.timestamp);
                    this.datePicker.maxDate = this.lastPaisDate;
                }
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
            this.userResultsVisible = false;
            if(user instanceof UserModel){
                this.userResultsVisible = true;
                this.uResultsComponent.loadUserResults(user);
            }
        });
    }

}