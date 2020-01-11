import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { JoinPipe } from '../../../pipes/join.pipe';
import { ResultsService } from '../../../services/results.service';
import { UserResultModel } from '../../../models/user-result';
import { UserModel } from '../../../models/user';
import { PageNotificationService } from '../../../services/page-notification.service';
import { IResult } from 'src/app/interfaces/iresult.interface';
import { ISaveDialogData } from './models/save-dialog';

@Component({
    selector: 'app-save-dialog',
    templateUrl: './save-dialog.component.html',
    styleUrls: ['./save-dialog.component.scss'],
    providers: [JoinPipe]
})
export class SaveDialogComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private resultsSvc: ResultsService,
                private notifySvc: PageNotificationService,
                public dialogRef: MatDialogRef<SaveDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ISaveDialogData) { }

    ngOnInit(): void {
      this.createForm();
    }

    get results(): FormArray {
      return this.form.get('results') as FormArray;
    }

    saveUserResults() {
        if (this.form.valid) {
            const model = new UserResultModel(this.form.value);

            this.resultsSvc
                .saveUserResults(model)
                .pipe(take(1))
                .subscribe(
                    (result: boolean) => {
                        const user = JSON.stringify(new UserModel(model));
                        sessionStorage.setItem('USER', user);

                        this.dialogRef.close(result === true);
                    },
                    (err: Error) => this.notifySvc.set(err.message, 400).show()
                );
        }
    }

    private createForm(): void {
      this.form = this.fb.group({
        lotteryId: [this.data.lotteryId, Validators.required],
        results: this.mapFormArrayResults(this.data.results),
        passport: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{1,4}')
        ])],
        phone: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{1,3}-?[0-9]+')
        ])]
      });
    }

    private mapFormArrayResults(results: IResult[]): FormArray {
      return this.fb.array(
        results.map(result => this.fb.group({
          lotteryId: [result.lotteryId],
          regular: [result.regular],
          strong: [result.strong]
        }))
      );
    }
}
