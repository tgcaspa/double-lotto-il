import { Injectable } from "@angular/core";
import * as appMetadata from "./app.metadata";

@Injectable()
export class ConfigServerUrlsService {

    readonly _URL = `http://localhost:${appMetadata.port}`;

    get apiURL(): string {
        return this._URL;
    }

}