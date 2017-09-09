import { CommonModel } from "./common";

declare let _: any;

export class UserModel extends CommonModel implements IUser {
    passport: number;
    phone: string;

    constructor(attr?: object) {
        attr = _.assign({}, attr);
        super(attr);

        this.passport = attr['passport'] || 0;
        this.phone = attr['phone'] || "";
    }
}