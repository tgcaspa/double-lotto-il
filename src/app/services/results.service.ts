import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ConfigServerUrlsService } from "../../../app/config/server-urls.service";
import { ResultModel } from "../models/result";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ResultsService {

    constructor(private http: Http,
                private serverSvc: ConfigServerUrlsService) {}

    getLastResultsFromPais(): Observable<ResultModel> {
        const url = `${this.serverSvc.apiURL}/api/results/pais/last`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err))
    }

    getResultsByIdFromPais(obj: ResultModel): Observable<ResultModel> {
        const url = `${this.serverSvc.apiURL}/api/results/pais/${obj.lottery_id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err))
    }

    getUserResults(obj: ResultModel): Observable<ResultModel[]> {
        const url = `${this.serverSvc.apiURL}/api/results/${obj.lottery_id}`;
        return this.http.post(url, JSON.stringify(obj))
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err))
    }

}
