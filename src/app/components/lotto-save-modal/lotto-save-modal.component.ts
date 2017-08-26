import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { JoinPipe } from "./join.pipe";

@Component({
    selector: 'lotto-save-modal',
    templateUrl: './lotto-save-modal.component.html',
    styleUrls: ['./lotto-save-modal.component.scss'],
    providers: [JoinPipe]
})
export class LottoSaveModalComponent {

    @Input() regularNums: number[];
    @Input() strongNums: number[];
    modalRef: BsModalRef;
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private modalService: BsModalService) {
        this.form = fb.group({
            'passport' : ['', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]{1,4}")
            ])],
            'phone' : ['', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]{1,3}-?[0-9]*")
            ])]
        });
    }

    isNumbersAreSelected():boolean {
        return this.regularNums.length === 6 && this.strongNums.length === 1;
    }

    openModal(template: TemplateRef<any>) {
        if(!this.isNumbersAreSelected()) {
            alert('לא נבחרו מספרים');
            return false;
        }
        this.form.reset();
        this.modalRef = this.modalService.show(template);
    }

    saveLottoNumbers() {

    }
}
