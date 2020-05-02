import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PageNotificationService {

    static optionsDefault: MatSnackBarConfig = {
        duration: 3000,
        data: {}
    };

    private body: string;
    private code: number;
    private options: MatSnackBarConfig;

    constructor(private translateSvc: TranslateService,
                private snackBar: MatSnackBar) {
        this.body = '';
        this.code = 0;
        this.options = PageNotificationService.optionsDefault;
    }

    public set(...params): this {
        if (!params.length) {
            throw new Error('No parameters were specified');
        } else if (params[0].constructor.name === 'Response') {
            try {
                const body = params[0].json();
                if (typeof body === 'string') {
                    this.body = body;
                } else {
                    this.body = params[0].statusText;
                }
            } catch (e) {
                this.body = params[0].toString() || '';
            }
            this.code = params[0].status || 0;
        } else {
            this.body = params[0].toString() || '';
            this.code = params[1] || 0;

            const options = params.slice(-1).shift() || {};
            this.options = Object.assign(
                PageNotificationService.optionsDefault,
                this.options,
                options
            );
        }
        this.body = this.body.length ? this.translateSvc.instant(this.body) : this.body;
        this.code = (Number(this.code) > 0) ? this.code : 0;

        return this;
    }

    public show(): void {
        const codeClass = this.fetchClassBy(this.code);

        if (codeClass === 'color-warning') {
            console.error(this.body);
        }

        this.options.data = {
            body: this.body,
            code: this.code,
            codeClass
        };

        this.snackBar.openFromComponent(SnackBarComponent, this.options);
    }

    private fetchClassBy(code: number): string {
      switch (this.code) {
        case 200:
          return 'color-success';

        case 400:
        default:
          return 'color-warning';
      }
    }
}
