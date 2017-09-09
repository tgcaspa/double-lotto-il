import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserModel } from "../../../models/user";

@Component({
    selector: 'app-compare-dialog',
    templateUrl: './compare-dialog.component.html',
    styleUrls: ['./compare-dialog.component.scss']
})
export class CompareDialogComponent {

    @Output() onCompare = new EventEmitter();
    form: FormGroup;

    constructor(@Inject(MD_DIALOG_DATA) public data: any,
                public dialogRef: MdDialogRef<CompareDialogComponent>,
                private fb: FormBuilder) {
        this.form = fb.group({
            'passport' : ['2093', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]{1,4}")
            ])],
            'phone' : ['0525856742', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]{2,3}-?[0-9]+")
            ])]
        });
    }

    compareUserResults() {
        if(this.form.valid) {
            this.dialogRef.close(
                new UserModel(this.form.value)
            );
        }
    }

}