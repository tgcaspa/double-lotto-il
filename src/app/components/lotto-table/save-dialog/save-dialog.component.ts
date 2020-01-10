import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { JoinPipe } from '../../../pipes/join.pipe';
import { ResultsService } from '../../../services/results.service';
import { UserResultModel } from '../../../models/user-result';
import { UserModel } from '../../../models/user';
import { PageNotificationService } from '../../../services/page-notification.service';
import { ResultModel } from 'src/app/models/result';

@Component({
    selector: 'app-save-dialog',
    templateUrl: './save-dialog.component.html',
    styleUrls: ['./save-dialog.component.scss'],
    providers: [JoinPipe]
})
export class SaveDialogComponent {

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private resultsSvc: ResultsService,
                private notifySvc: PageNotificationService,
                @Inject(MAT_DIALOG_DATA) public data: ResultModel,
                public dialogRef: MatDialogRef<SaveDialogComponent>) {
        this.form = this.fb.group({
            passport : ['', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]{1,4}')
            ])],
            phone : ['', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]{1,3}-?[0-9]+')
            ])]
        });
    }

    get regularNums() {
        return this.data.regular;
    }

    get strongNums() {
        return this.data.strong;
    }

    saveUserResults() {
        if (this.form.valid) {
            debugger;
            const model = new UserResultModel(this.form.value);
            model.lotteryId = this.data.lotteryId;
            model.regular = this.data.regular;
            model.strong = this.data.strong;

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
}
