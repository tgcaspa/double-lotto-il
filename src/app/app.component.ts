import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { ResultsService } from './services/results.service';
import { ResultModel } from './models/result';
import { PageNotificationService } from './services/page-notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ResultsService]
})
export class AppComponent implements OnInit {

    readonly PLR_KEY = 'PAIS_LAST_RESULT';

    constructor(translate: TranslateService,
                private resultsSvc: ResultsService,
                private notifySvc: PageNotificationService) {
        // application language
        translate.use('he');
    }

    ngOnInit(): void {
      // last Pais result
      this.resultsSvc
          .getLastResultsFromPais()
          .pipe(take(1))
          .subscribe(
            (result: ResultModel) => this.resultsSvc.pushPaisLastResult$(result),
            (err: Error) => this.notifySvc.set(err.message, 400).show()
          );
      // const paisResult = sessionStorage.getItem(this.PLR_KEY);
      // if (!paisResult) {
      //   this.resultsSvc
      //       .getLastResultsFromPais()
      //       .pipe(take(1))
      //       .subscribe(
      //         (result: ResultModel) => {
      //           sessionStorage.setItem(this.PLR_KEY, JSON.stringify(result));
      //           this.resultsSvc.pushPaisLastResult$(result);
      //         },
      //         (err: Error) => this.notifySvc.set(err.message, 400).show()
      //       );
      // } else {
      //   this.resultsSvc.pushPaisLastResult$(paisResult);
      // }
    }

}
