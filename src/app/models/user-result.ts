import { UserModel } from './user';
import { IResult } from '../interfaces/iresult.interface';
import { IUser } from '../interfaces/iuser.interface';

export type IUserResult =
  IUser
  & Pick<IResult, 'lotteryId'>
  & { results: IResult[]; };

export class UserResultModel implements IUserResult {
  lotteryId: number;
  results: IResult[];
  passport: string;
  phone: string;

  constructor(attr?: Partial<IUserResult>) {
    attr = Object.assign({}, attr);

    this.lotteryId = attr.lotteryId;
    this.results = attr.results;

    Object.assign(this, new UserModel(attr));
  }

}
