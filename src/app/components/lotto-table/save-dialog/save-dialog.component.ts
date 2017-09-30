import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JoinPipe } from "../../../pipes/join.pipe";
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
import { ResultsService } from "../../../services/results.service";
import { UserResultModel } from "../../../models/user-result";
import { UserModel } from "../../../models/user";
import { PageNotificationService } from "../../../services/page-notification.service";

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
                @Inject(MD_DIALOG_DATA) public data: any,
                public dialogRef: MdDialogRef<SaveDialogComponent>) {
        this.form = fb.group({
            'passport' : ['', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]{1,4}")
            ])],
            'phone' : ['', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]{1,3}-?[0-9]+")
            ])]
        });
    }

    get regularNums() {
        return this.data.regularNums;
    }

    get strongNums() {
        return this.data.strongNums;
    }

    saveUserResults() {
        if(this.form.valid) {
            let model = new UserResultModel(this.form.value);
            model.lottery_id = this.data.lottery_id;
            model.regular = this.data.regularNums;
            model.strong = this.data.strongNums;

            this.resultsSvc
                .saveUserResults(model)
                .subscribe(
                    (result: boolean) => {
                        let user = JSON.stringify(new UserModel(model));
                        sessionStorage.setItem('USER', user);

                        this.dialogRef.close(result === true);
                    },
                    (response: Response) => {
                        this.notifySvc.set(response.text(), 400).show()
                    }
                );
        }
    }
}
