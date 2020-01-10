import { ResultModel } from './result';
import { UserModel } from './user';
import { IResult } from '../interfaces/iresult.interface';
import { IUser } from '../interfaces/iuser.interface';

export type IUserResult = IResult & IUser;

export class UserResultModel extends ResultModel implements IUserResult {
    passport: string;
    phone: string;

    constructor(attr?: Partial<IUserResult>) {
        attr = Object.assign({}, attr);
        super(attr);

        Object.assign(this, new UserModel(attr));
    }

}
