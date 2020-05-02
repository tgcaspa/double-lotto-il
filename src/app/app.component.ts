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

      // Code to handle install prompt on desktop
      this.initA2HSButton();
    }

    private initA2HSButton() {
      let deferredPrompt;
      const addBtn = document.querySelector<HTMLElement>('.btn-a2hs');
      addBtn.style.display = 'none';

      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        addBtn.style.display = 'block';

        addBtn.addEventListener('click', (e) => {
          // hide our user interface that shows our A2HS button
          addBtn.style.display = 'none';
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
        });
      });
    }

}
