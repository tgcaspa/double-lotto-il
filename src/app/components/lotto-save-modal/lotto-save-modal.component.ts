import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

@Component({
    selector: 'lotto-save-modal',
    templateUrl: './lotto-save-modal.component.html',
    styleUrls: ['./lotto-save-modal.component.scss']
})
export class LottoSaveModalComponent {

    public modalRef: BsModalRef;
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

    openModal(template: TemplateRef<any>) {
        this.form.reset();
        this.modalRef = this.modalService.show(template);
    }

    saveLottoNumbers() {

    }
}
