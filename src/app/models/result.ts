declare let _: any;

export class ResultModel implements IResult {
    lottery_id: number;
    timestamp: number;
    regular: number[];
    strong: number[];
    pais: boolean;

    constructor(attr?: object) {
        attr = _.assign({}, attr);

        this.lottery_id = attr['lottery_id'] || 0;
        this.timestamp = attr['timestamp'] || 0;
        this.setRegular(attr['regular']);
        this.setStrong(attr['strong']);
        this.pais = attr['pais'] == '1';
    }

    setRegular(value) {
        if(_.isString(value)) {
            value = value.split(',');
        } else if(!_.isArray(value)) {
            value = [];
        }
        this.regular = value;
    }

    setStrong(value) {
        if(_.isString(value)) {
            value = value.split(',');
        } else if(!_.isArray(value)) {
            value = [];
        }
        this.strong = value;
    }

}