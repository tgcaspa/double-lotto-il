declare let _: any;

export class UserAbstractModel {

    passport: number;
    phone: string;

    constructor(attr?: object) {
        attr = _.assign({}, attr);

        this.passport = attr['passport'] || 0;
        this.phone = attr['phone'] || "";
    }
}