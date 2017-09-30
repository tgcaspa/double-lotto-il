import { Component, Inject } from '@angular/core';
import { MD_SNACK_BAR_DATA } from "@angular/material";

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

    constructor(@Inject(MD_SNACK_BAR_DATA) public data: any
    ) { }

}
