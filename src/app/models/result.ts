import { CommonModel } from "./common";

declare let _: any;

export class ResultModel extends CommonModel implements IResult {
    lottery_id: string;
    timestamp: number;
    regular: number[];
    strong: number[];
    pais: boolean;

    constructor(attr?: object) {
        attr = _.assign({}, attr);
        super(attr);

        this.lottery_id = attr['lottery_id'] || "";
        this.timestamp = attr['timestamp'] || 0;
        this.setRegular(attr['regular']);
        this.setStrong(attr['strong']);
        this.pais = attr['pais'] == '1';
    }

    setRegular(numbers) {
        this.regular = this._setNumbers(numbers);
    }

    setStrong(numbers) {
        this.strong = this._setNumbers(numbers);
    }

    private _setNumbers(numbers): number[] {
        if(_.isString(numbers)) {
            numbers = numbers.split(',')
                             .map((n) => Number(n));
        } else if(!_.isArray(numbers)) {
            numbers = [];
        }
        return numbers;
    }

}