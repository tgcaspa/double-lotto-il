import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html',
  styleUrls: ['./compare-modal.component.scss']
})
export class CompareModalComponent {

    @Output() onCompare = new EventEmitter();
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

    openModal(template: TemplateRef<any>) {
        this.form.reset();
        this.modalRef = this.modalService.show(template);
    }

    compareUserResults() {
        debugger;

        if(this.form.valid) {
            this.onCompare.next();
            if(this.modalRef) {
                this.modalRef.hide();
            }
        }
    }

}
