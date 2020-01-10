
export abstract class LottoTableFormBuilderComponentRef {
  abstract initTable(): void;
  abstract generateNumbers(): void;
  abstract hasValue(): boolean;
  abstract getValue(): IFormResults[];
}

export interface IFormResults {
  regular: number[];
  strong: number[];
}
