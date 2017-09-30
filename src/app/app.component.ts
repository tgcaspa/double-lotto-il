import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ResultsService } from "./services/results.service";
import { ResultModel } from "./models/result";
import { MdSnackBar } from "@angular/material";
import { SnackBarComponent } from "./components/snack-bar/snack-bar.component";
import { PageNotificationService } from "./services/page-notification.service";

@Component({
    selector: 'app-lotto',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ResultsService]
})
export class AppComponent {

    readonly PLR_KEY = 'PAIS_LAST_RESULT';

    constructor(translate: TranslateService,
                private resultsSvc: ResultsService,
                private notifySvc: PageNotificationService) {
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
                    (response: Response) => {
                        this.notifySvc.set(response.text(), 400).show()
                    }
                );
        } else {
            this.resultsSvc.pushPaisLastResult$(paisResult);
        }
    }

}
