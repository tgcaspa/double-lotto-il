import { Component, Input, OnInit } from '@angular/core';
import { ResultModel } from "../../../models/result";

declare let _: any;

@Component({
    selector: 'app-user-results',
    templateUrl: './user-results.component.html',
    styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {

    @Input() paisResults: ResultModel;
    userResults: ResultModel[];

    constructor() {
    }

    ngOnInit() {
        this.userResults = [
            new ResultModel({
                'regular': "2,7,11,15,25,36",
                'strong': "1",
                'timestamp': 1504364988
            }),
            new ResultModel({
                'regular': "3,4,15,18,29,30",
                'strong': "5",
                'timestamp': 1504264988
            })
        ]
    }

    isRegularMatched(value: number): boolean {
        return _.includes(this.paisResults.regular, Number(value));
    }

    isStrongMatched(value: number): boolean {
        return _.includes(this.paisResults.strong, Number(value));
    }
}
