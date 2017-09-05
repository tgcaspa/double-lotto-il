import { Injectable } from "@angular/core";

@Injectable()
export abstract class ConfigServerUrlsService {

    readonly _URL = "http://localhost:4200";

    get apiURL(): string {
        return this._URL;
    }

}