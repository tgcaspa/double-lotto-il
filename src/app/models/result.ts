declare let _: any;

export class ResultModel {
    lottery_id: number;
    timestamp: number;
    regular: number[];
    strong: number[];
    pais: boolean;
    passport: number;
    phone: string;

    constructor(attr?: object) {
        attr = _.assign({}, attr);

        this.lottery_id = attr['lottery_id'] || null;
        this.timestamp = attr['timestamp'] || 0;
        this.regular = attr['regular'] ? attr['regular'].split(',') : [];
        this.strong = attr['strong'] ? attr['strong'].split(',') : [];
        this.pais = attr['pais'] == '1';
        this.passport = attr['passport'] || null;
        this.phone = attr['phone'] || null;
    }
}