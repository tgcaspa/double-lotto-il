import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

@Component({
    selector: 'lotto-save-modal',
    templateUrl: './lotto-save-modal.component.html',
    styleUrls: ['./lotto-save-modal.component.scss']
})
export class LottoSaveModalComponent implements OnInit {

    public modalRef: BsModalRef;
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private modalService: BsModalService) {
        this.form = fb.group({
            'passport' : [null, Validators.compose([
                Validators.required,
                Validators.maxLength(4)
            ])],
            'phone' : ['', Validators.compose([
                Validators.required,
                Validators.pattern(/\d+/)
            ])]
        });
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit() {}

    saveLottoNumbers() {

    }
}
