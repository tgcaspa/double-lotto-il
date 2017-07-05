import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'lotto-table',
    templateUrl: './lotto-table.component.html',
    styleUrls: ['./lotto-table.component.scss']
})
export class LottoTableComponent implements OnInit {

    readonly REGULAR_MAX_SELECT = 6;
    readonly REGULAR_CELLS = 37;
    readonly STRONG_MAX_SELECT = 1;
    readonly STRONG_CELLS = 7;

    regularNums = [];
    strongNums = [];

    constructor() {
    }

    ngOnInit() {
        this.initRegularNums();
        this.initStrongNums();
    }

    isNewLine_regular(ix) {
        let res = [7, 17, 27].indexOf(ix);
        return Boolean(res !== -1);
    }

    isNewLine_stong(ix) {
        let res = [1,3].indexOf(ix);
        return Boolean(res !== -1);
    }

    initRegularNums() {
        this.regularNums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    initStrongNums() {
        this.strongNums = [0, 0, 0, 0, 0, 0, 0];
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
            this.regularNums[n] = 1;
        }
        console.log(`regular: ${collection}`);
    }

    private generateStrongNums() {
        let collection = [];
        for (let ix = 0; ix < this.STRONG_MAX_SELECT; ix++) {
            let n;
            do {
                n = Math.floor(Math.random() * this.STRONG_CELLS);
            } while (collection.indexOf(n) !== -1);
            collection.push(n);
            this.strongNums[n] = 1;
        }
        console.log(`strong: ${collection}`);
    }

}
