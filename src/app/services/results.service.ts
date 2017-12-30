import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions } from "@angular/http";
import { ConfigServerUrlsService } from "../../../config/server-urls.service";
import { ResultModel } from "../models/result";
import { UserResultModel } from "../models/user-result";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare let _: any;

@Injectable()
export class ResultsService {

    paisLastResult = new BehaviorSubject(null);

    constructor(private http: Http,
                private serverSvc: ConfigServerUrlsService) {}

    pushPaisLastResult$(result: any) {
        return Observable
            .of(result)
            .subscribe((value: any) => {
                if(!(value instanceof ResultModel)) {
                    value = _.isString(value)
                        ? JSON.parse(value)
                        : value;
                    value = new ResultModel(value);
                }
                this.paisLastResult.next(value);
            });
    }

    getLastResultsFromPais(): Observable<ResultModel> {
        const url = `${this.serverSvc.apiURL}/api/results/pais/last`;
        return this.http.get(url)
            .map((response: Response) => {
                const data = response.json().data;
                if(!data) {
                    throw new Response(
                        new ResponseOptions({
                            body:"Invalid Pais results",
                            status: 400
                        })
                    );
                }
                return new ResultModel(data);
            })
            .catch((err: Response) => Observable.throw(err))
    }

    getResultsByIdFromPais(obj: ResultModel): Observable<ResultModel> {
        const url = `${this.serverSvc.apiURL}/api/results/pais/${obj.lottery_id}`;
        return this.http.get(url)
            .map((res: Response) => {
                const data = res.json().data;
                if(!data) {
                    throw new Response(
                        new ResponseOptions({
                            body:"Invalid Pais results",
                            status: 400
                        })
                    );
                }
                return new ResultModel(data);
            })
            .catch((err: Response) => Observable.throw(err))
    }

    getUserResults(obj: UserResultModel): Observable<UserResultModel[]> {
        const url = `${this.serverSvc.apiURL}/api/results/${obj.lottery_id}`;
        return this.http.post(url, obj)
            .map((res: Response) => {
                const data = res.json().data;
                if(!data) {
                    throw new Response(
                        new ResponseOptions({
                            body:"Invalid user results",
                            status: 400
                        })
                    );
                }
                const results = data.length ? data[0]['results'] : [];
                return UserResultModel.createFromArray(results);
            })
            .catch((err: Response) => Observable.throw(err))
    }

    saveUserResults(obj: ResultModel): Observable<boolean> {
        const url = `${this.serverSvc.apiURL}/api/results/${obj.lottery_id}/save`;
        return this.http.post(url, obj)
            .map((res: Response) => {
                return res.json().data === 1;
            })
            .catch((err: Response) => Observable.throw(err))
    }

}
