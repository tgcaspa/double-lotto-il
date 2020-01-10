import { isArray, isObject, isString } from 'lodash';
import { IResult } from '../interfaces/iresult.interface';
import { CommonModel } from './common';

export class ResultModel extends CommonModel implements IResult {
    lotteryId: number;
    timestamp: number;
    regular: number[];
    strong: number[];
    pais: boolean;

  constructor(attr?: Partial<IResult>) {
        attr = Object.assign({}, attr);
        super(attr);

        this.lotteryId = attr.lotteryId;
        this.timestamp = attr.timestamp || 0;
        this.setRegular(attr.regular);
        this.setStrong(attr.strong);
        this.pais = String(attr.pais) === 'true';
    }

    setRegular(numbers: any) {
        this.regular = this._splitNumbers(numbers);
    }

    setStrong(numbers: any) {
        this.strong = this._splitNumbers(numbers);
    }

    private _splitNumbers(numbers: string | number | number[]): number[] {
        let result: number[];

        if (isString(numbers)) {
            result = numbers.split(',')
                            .map((n: string) => Number(n));
        } else if (!isArray(numbers)) {
          result = [];
          if (Number.isInteger(numbers)) {
            result.push(numbers);
          }
        }

        return result;
    }

}


export const isResultModel = (data: any): data is IResult =>
  isObject(data) && 'lotteryId' in data && 'strong' in data && 'regular' in data;
