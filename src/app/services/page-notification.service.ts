import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SnackBarComponent } from "../components/snack-bar/snack-bar.component";
import { MdSnackBar, MdSnackBarConfig } from "@angular/material";

@Injectable()
export class PageNotificationService {

    static optionsDefault: MdSnackBarConfig = {
        duration: 3000,
        data: {}
    };

    private body: string;
    private code: number;
    private options: MdSnackBarConfig;

    constructor(private translateSvc: TranslateService,
                private snackBar: MdSnackBar) {
        this.body = "";
        this.code = 0;
        this.options = PageNotificationService.optionsDefault;
    }

    public set(...params): this {
        if (!params.length) {
            throw new Error('No parameters were specified');
        } else if (params[0].constructor.name === "Response") {
            try {
                let body = params[0].json();
                if (typeof body === 'string') {
                    this.body = body;
                } else {
                    this.body = params[0].statusText;
                }
            } catch (e) {
                this.body = params[0].toString() || "";
            }
            this.code = params[0].status || 0;
        } else {
            this.body = params[0].toString() || "";
            this.code = params[1] || 0;

            let options = params.slice(-1).shift() || {};
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
        let codeClass;
        switch (this.code) {
            case 200:
                codeClass = 'color-success';
                break;
            case 400:
            default:
                codeClass = 'color-warning';
                break;
        }

        if(codeClass === 'color-warning') {
            console.error(this.body);
        }

        this.options.data = {
            body: this.body,
            code: this.code,
            codeClass: codeClass
        };
        this.snackBar.openFromComponent(SnackBarComponent, this.options);
    }

}