import { IResult } from 'src/app/interfaces/iresult.interface';

export abstract class LottoTableFormBuilderComponentRef {
  abstract initTable(): void;
  abstract generateNumbers(): void;
  abstract hasValue(): boolean;
  abstract getValue(): IFormResults[];
}

export type IFormResults = Pick<IResult, 'regular' | 'strong'>;
