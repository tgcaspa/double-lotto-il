import { IResult } from 'src/app/interfaces/iresult.interface';

export type ISaveDialogData =
  Pick<IResult, 'lotteryId'>
  & { results: IResult[]; };
