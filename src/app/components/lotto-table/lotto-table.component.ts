import { Component, OnInit } from '@angular/core';
import { ResultModel } from "../../models/result";
import { ResultsService } from "../../services/results.service";
import { SaveDialogComponent } from "./save-dialog/save-dialog.component";
import { MdDialog } from "@angular/material";
import { PageNotificationService } from "../../services/page-notification.service";

declare let $:any;
declare let _:any;

@Component({
    selector: 'lotto-table',
    templateUrl: './lotto-table.component.html',
    styleUrls: ['./lotto-table.component.scss']
})
export class LottoTableComponent implements OnInit {

    readonly ATTR_REGULAR = 'regular';
    readonly REGULAR_MAX_SELECT = 6;
    readonly REGULAR_CELLS = 37;
    readonly ATTR_STRONG = 'strong';
    readonly STRONG_MAX_SELECT = 1;
    readonly STRONG_CELLS = 7;

    // selected numbers
    regularNums: number[] = [];
    strongNums: number[] = [];
    // table cell's reference
    regularCells: number[] = [];
    strongCells: number[] = [];

    paisLastResult: ResultModel;
    nextPaisLotteryId: number;
    pageMessage: string;

    constructor(private resultsSvc: ResultsService,
                public dialog: MdDialog,
                private notifySvc: PageNotificationService) {}

    ngOnInit() {
        // last Pais result
        this.resultsSvc
            .paisLastResult
            .subscribe(
                (result: ResultModel) => {
                    this.paisLastResult = result;
                    // if(this.paisLastResult instanceof ResultModel) {
                    //     this.nextPaisLotteryId = this.paisLastResult.lottery_id + 1;
                    // } else {
                    //     this.nextPaisLotteryId = 0;
                    // }
                },
                (response: Response) => {
                    this.notifySvc.set(response.text(), 400).show()
                }
            );
        // init clean table
        this.initRegularNums();
        this.initStrongNums();
    }

    isNewLine_regular(ix) {
        let res = [7, 17, 27].indexOf(ix);
        return Boolean(res !== -1);
    }

    initRegularNums() {
        this.regularCells = new Array(this.REGULAR_CELLS).fill(0);
        this.regularNums  = [];
    }

    initStrongNums() {
        this.strongCells = new Array(this.STRONG_CELLS).fill(0);
        this.strongNums  = [];
    }

    generateNumbers() {
        console.log('generating numbers...');
        this.initRegularNums();
        this.initStrongNums();
        this.generateRegularNums();
        this.generateStrongNums();
    }

    private generateRegularNums() {
        let collection = [];
        for (let ix = 0; ix < this.REGULAR_MAX_SELECT; ix++) {
            let n;
            do {
                n = Math.floor(Math.random() * this.REGULAR_CELLS);
            } while (collection.indexOf(n) !== -1);
            collection.push(n);
            this.regularCells[n] = 1;
        }
        this.regularNums = this.getSelectedKeys(this.regularCells);
        console.log(`${this.ATTR_REGULAR}: ${this.regularNums}`);
    }

    private generateStrongNums() {
        let collection = [];
        for (let ix = 0; ix < this.STRONG_MAX_SELECT; ix++) {
            let n;
            do {
                n = Math.floor(Math.random() * this.STRONG_CELLS);
            } while (collection.indexOf(n) !== -1);
            collection.push(n);
            this.strongCells[n] = 1;
        }
        this.strongNums = this.getSelectedKeys(this.strongCells);
        console.log(`${this.ATTR_STRONG}: ${this.strongNums}`);
    }

    getSelectedKeys(numbers: number[]): number[] {
        let collection = [];
        for (let ix = 0; ix < numbers.length; ix++) {
            if(numbers[ix] === 1) {
                collection.push(ix+1);
            }
        }
        return collection;
    }

    cellClicked(e: Event, ix: number, type: string) {
        const selected = $(e.target).hasClass('selected');
        const val = Number(!selected);
        switch(type) {
            case this.ATTR_REGULAR:
                if(val && this.regularNums.length >= this.REGULAR_MAX_SELECT) {
                    this.notifySvc.set("You can select no more than six regular numbers", 400).show();
                    return;
                }
                this.regularCells[ix] = val;
                this.regularNums = this.getSelectedKeys(this.regularCells);
                break;
            case this.ATTR_STRONG:
                if(val && this.strongNums.length >= this.STRONG_MAX_SELECT) {
                    this.notifySvc.set("You can select no more than one strong number", 400).show();
                    return;
                }
                this.strongCells[ix] = val;
                this.strongNums = this.getSelectedKeys(this.strongCells);
                break;
        }
    }

    isNumbersAreSelected():boolean {
        return (this.regularNums.length === this.REGULAR_MAX_SELECT)
            && (this.strongNums.length === this.STRONG_MAX_SELECT);
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(SaveDialogComponent, {
            data: {
                regularNums: this.regularNums,
                strongNums: this.strongNums,
                lottery_id: this.nextPaisLotteryId
            },
            direction: "rtl"
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if(result === true) {
                // init clean table
                this.initRegularNums();
                this.initStrongNums();

                this.notifySvc
                    .set("The numbers have been saved successfully", 200)
                    .show()
            }
        });
    }

    archiveIdSelected(lottery_id: number) {
        this.nextPaisLotteryId = lottery_id;
    }

}
