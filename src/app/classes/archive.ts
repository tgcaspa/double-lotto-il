import { FormGroup, FormBuilder } from '@angular/forms';
import { range } from 'lodash';
import { ResultModel } from '../models/result';

export abstract class Archive {
    protected _maxLastResults = 3;
    protected _dir = 1;
    protected _showDate = true;
    lottoArchiveList: number[];
    selectedResultForm: FormGroup;

    get maxLastResults(): number {
      return this._maxLastResults;
    }

    constructor(protected fb: FormBuilder) {
      this.selectedResultForm = this.fb.group( new ResultModel() );
    }

    getLottoArchiveList(lastId: number, dir: number) {
      const ltid = this.calcLastLotteryId(lastId, dir);
      return range((ltid - this._maxLastResults), ltid).reverse();
    }

    protected calcLastLotteryId(lastId: number, dir: number): number {
      if (!Number.isInteger(Number(lastId)) || Number(lastId) <= 0) {
        throw new Error(`Invalid lottery id has specified`);
      }
      if (!Number.isInteger(Number(dir))) {
        throw new Error(`Invalid direction has specified`);
      }
      return lastId + dir;
    }

    abstract archiveIdSelected(lotteryId: number): void;

}
