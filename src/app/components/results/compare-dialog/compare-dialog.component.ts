import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../models/user';

@Component({
    selector: 'app-compare-dialog',
    templateUrl: './compare-dialog.component.html',
    styleUrls: ['./compare-dialog.component.scss']
})
export class CompareDialogComponent implements OnInit {

    form: FormGroup;
    hasSessionUser = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<CompareDialogComponent>,
                private fb: FormBuilder) {
        this.form = fb.group({
            passport : ['', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]{1,4}')
            ])],
            phone : ['', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]{2,3}-?[0-9]+')
            ])]
        });
    }

    ngOnInit(): void {
        const storage = sessionStorage.getItem('USER');
        const user = new UserModel(JSON.parse(storage));

        if (user.passport && user.phone) {
            this.form.get('passport').setValue(user.passport);
            this.form.get('phone').setValue(user.phone);
            this.hasSessionUser = true;
        }
    }

    compareUserResults() {
        if (this.form.valid) {
            this.dialogRef.close(
                new UserModel(this.form.value)
            );
        }
    }

    clearForm() {
        this.hasSessionUser = false;
        sessionStorage.removeItem('USER');
        this.form.reset();
    }
}
