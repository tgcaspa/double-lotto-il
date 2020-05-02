import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { isEmpty, last } from 'lodash';
import { PageNotificationService } from 'src/app/services/page-notification.service';
import { LottoTableFormBuilderComponentRef, IFormResults } from './models/form-builder';

@Component({
  selector: 'app-lotto-table-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  providers: [
    {provide: LottoTableFormBuilderComponentRef, useExisting: forwardRef(() => LottoTableFormBuilderComponent)}
  ]
})
export class LottoTableFormBuilderComponent implements LottoTableFormBuilderComponentRef,
                                                       OnInit {
  readonly ATTR_REGULAR = 'regular';
  readonly REGULAR_MAX_SELECT = 6;
  readonly REGULAR_CELLS = 37;
  readonly ATTR_STRONG = 'strong';
  readonly STRONG_MAX_SELECT = 1;
  readonly STRONG_CELLS = 7;
  readonly TABLES_MAX_LENGTH = 14;

  // table cell's reference
  tableFormArray: FormArray;

  get tableFormControlsLength(): number {
    return this.tableFormArray.controls.length;
  }

  constructor(private fb: FormBuilder,
              private notifySvc: PageNotificationService) { }

  ngOnInit(): void {
    // init clean table
    this.initTable();
  }

  initTable(): void {
    this.createTableFormArray();
    this.addNewTableFormGroup();
  }

  hasValue(): boolean {
    const result = last(this.getValue());

    if (isEmpty(result)) {
      return false;
    }
    if (result.regular.length < this.REGULAR_MAX_SELECT) {
      return false;
    }
    if (result.strong.length < this.STRONG_MAX_SELECT) {
      return false;
    }
    return true;
  }

  getValue(): IFormResults[] {
    const rawValue = this.tableFormArray.getRawValue() as IFormResults[];
    return rawValue.map(result => {
      result.regular = this.getSelectedNumbers(result.regular);
      result.strong  = this.getSelectedNumbers(result.strong);
      return result;
    });
  }

  isAvailableToAddNewTable(): boolean {
    return this.tableFormControlsLength < this.TABLES_MAX_LENGTH;
  }

  isAvailableToRemoveTable(): boolean {
    return this.tableFormControlsLength > 1
        && this.tableFormControlsLength < this.TABLES_MAX_LENGTH;
  }

  isNewLine_regular(ix: number) {
    const res = [7, 17, 27].indexOf(ix);
    return Boolean(res !== -1);
  }

  generateNumbers(): void {
    const lastIx = this.tableFormControlsLength > 0
      ? this.tableFormControlsLength - 1
      : 0;
    const result: IFormResults = {
      regular: this._generateNumbers(this.ATTR_REGULAR),
      strong: this._generateNumbers(this.ATTR_STRONG)
    };
    this.tableFormArray.get(String(lastIx)).patchValue(result);

    console.group(`Generating numbers [Table ${this.tableFormControlsLength}]...`);
    console.log(`${this.ATTR_REGULAR}: ${this.getSelectedNumbers(result.regular)}`);
    console.log(`${this.ATTR_STRONG}: ${this.getSelectedNumbers(result.strong)}`);
    console.groupEnd();
  }

  cellClicked(table: FormControl, ix: number, type: string) {
    const val = Number(!table.value[ix]);

    if (val) {
      const selected = this.getSelectedNumbers(table.value);

      if (type === this.ATTR_REGULAR && selected.length >= this.REGULAR_MAX_SELECT) {
        this.notifySvc.set('You can select no more than six regular numbers', 400).show();
        return;
      }
      if (type === this.ATTR_STRONG && selected.length >= this.STRONG_MAX_SELECT) {
        this.notifySvc.set('You can select no more than one strong number', 400).show();
        return;
      }
    }

    table.value[ix] = val;
  }

  addNewTableFormGroup(): void {
    if (this.isAvailableToAddNewTable()) {
      this.tableFormArray.push(this.getNewTableFormGroup());
    }
  }

  removeTableFormGroup(ix: number): void {
    this.tableFormArray.removeAt(ix);
  }

  trackTableByFn(ix): number {
    return ix;
  }

  trackRowByFn(cell, row): string {
    return `${row}-${cell}`;
  }

  private createTableFormArray(): void {
    this.tableFormArray = this.fb.array([]);
  }

  private getNewTableFormGroup(): FormGroup {
    return this.fb.group({
      regular: [this.fillRegularCells()],
      strong: [this.fillStrongCells()]
    });
  }

  private fillRegularCells(): number[] {
    return new Array(this.REGULAR_CELLS).fill(0);
  }

  private fillStrongCells(): number[] {
    return new Array(this.STRONG_CELLS).fill(0);
  }

  private _generateNumbers(type: string): number[] {
    let result: number[];
    let max: number;
    let cells: number;

    if (type === this.ATTR_REGULAR) {
      result = this.fillRegularCells();
      max = this.REGULAR_MAX_SELECT;
      cells = this.REGULAR_CELLS;
    } else if (type === this.ATTR_STRONG) {
      result = this.fillStrongCells();
      max = this.STRONG_MAX_SELECT;
      cells = this.STRONG_CELLS;
    }

    const collection = [];
    for (let ix = 0; ix < max; ix++) {
      let n: number;
      do {
        n = Math.floor(Math.random() * cells);
      } while (collection.indexOf(n) !== -1);
      collection.push(n);
      result[n] = 1;
    }

    return result;
  }

  private getSelectedNumbers(value: number[]): number[] {
    return value.reduce((acc, v, ix) => {
      if (v === 1) {
        acc.push(ix + 1);
      }
      return acc;
    }, []);
  }
}
