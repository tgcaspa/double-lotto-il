import { CommonModel } from './common';
import { IUser } from '../interfaces/iuser.interface';

export class UserModel extends CommonModel implements IUser {
    passport: string;
    phone: string;

    constructor(attr?: Partial<IUser>) {
        attr = Object.assign({}, attr);
        super(attr);

        this.passport = attr.passport || '';
        this.phone = attr.phone || '';
    }
}
