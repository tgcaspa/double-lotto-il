import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ResultsService } from "./services/results.service";
import { ResultModel } from "./models/result";

@Component({
    selector: 'app-lotto',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    readonly PLR_KEY = 'PAIS_LAST_RESULT';

    constructor(translate: TranslateService,
                private resultsSvc: ResultsService) {
        // application language
        translate.use('he');
        // last Pais result
        const paisResult = sessionStorage.getItem(this.PLR_KEY);
        if(!paisResult) {
            resultsSvc
                .getLastResultsFromPais()
                .subscribe(
                    (result: ResultModel) => {
                        sessionStorage.setItem(this.PLR_KEY, JSON.stringify(result));
                        this.resultsSvc.pushPaisLastResult$(result);
                    },
                    (error: Response) => { console.log(error); }
                );
        } else {
            this.resultsSvc.pushPaisLastResult$(paisResult);
        }
    }

}
