import { EventEmitter, Input, Output, OnChanges, SimpleChanges } from "@angular/core";
import { ResultModel } from "../models/result";

declare let _: any;

export abstract class Archive implements OnChanges {
    @Input('last-result') paisLastResult: ResultModel;
    @Input('dir') set dir(dir: number) {
        this._dir = Number(dir) === -1 ? -1 : 1
    }
    @Output() onArchiveIdSelected = new EventEmitter();

    protected _maxLastResults: number = 3;
    protected _dir: number = 1;
    lottoArchiveList: number[];
    selectedResult: ResultModel;

    get maxLastResults(): number {
        return this._maxLastResults;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['paisLastResult'] && this.paisLastResult instanceof ResultModel) {
            this.selectedResult = this.paisLastResult;
            this.lottoArchiveList = this.getLottoArchiveList(this.paisLastResult.lottery_id, this._dir);
        }
    }

    getLottoArchiveList(last_id: number, dir: number) {
        last_id = last_id > 0 ? Number(last_id) : 0;
        dir = Number(dir) === -1 ? -1 : 1;
        const ltid = dir === -1 ? last_id+1 : last_id+2;
        return _.range((ltid - this._maxLastResults), ltid).reverse();
    }

    abstract archiveIdSelected(lottery_id: number);

}