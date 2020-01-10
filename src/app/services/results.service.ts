import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isString } from 'lodash';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigServerUrlsService } from '../../../config/server-urls.service';
import { IResult } from '../interfaces/iresult.interface';
import { ResultModel, isResultModel } from '../models/result';
import { UserResultModel } from '../models/user-result';


@Injectable()
export class ResultsService {
    private readonly DEFAULT_HTTP_HEADERS = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    paisLastResult$ = new BehaviorSubject<ResultModel>(null);

    constructor(private http: HttpClient,
                private serverSvc: ConfigServerUrlsService) {}

    pushPaisLastResult$(result: any) {
      if (!(result instanceof ResultModel)) {
        result = isString(result)
          ? JSON.parse(result)
          : result;
        result = new ResultModel(result);
      }
      this.paisLastResult$.next(result);
    }

    getLastResultsFromPais(): Observable<ResultModel> {
      const url = `${this.serverSvc.apiURL}/results/pais/last`;
      const options = { headers: this.DEFAULT_HTTP_HEADERS };

      return this.http.get(url, options).pipe(
        map((data: IResult) => {
          if (!isResultModel(data)) {
            throw new Error('Invalid Pais results');
          }
          return new ResultModel(data);
        }),
        catchError((err: any) => throwError(err))
      );
    }

    getResultsByIdFromPais(obj: ResultModel): Observable<ResultModel> {
        const url = `${this.serverSvc.apiURL}/api/results/pais/${obj.lotteryId}`;
        return this.http.get(url).pipe(
          map((response: any) => {
            const {data} = response;
            if (!data) {
              // TODO: fix it.
              // throw new Response(
              //     new ResponseOptions({
              //         body:'Invalid Pais results',
              //         status: 400
              //     })
              // );
            }
            return new ResultModel(data);
          }),
          catchError((err: any) => throwError(err))
        );
    }

    getUserResults(obj: UserResultModel): Observable<UserResultModel[]> {
        const url = `${this.serverSvc.apiURL}/api/results/${obj.lotteryId}`;
        return this.http.post(url, obj).pipe(
          map((response: any) => {
            const {data} = response;
            if (!data) {
              // TODO: fix it.
              // throw new Response(
              //     new ResponseOptions({
              //         body:'Invalid user results',
              //         status: 400
              //     })
              // );
            }
            const results = data.length ? data[0].results : [];
            return UserResultModel.createFromArray(results);
          }),
          catchError((err: any) => throwError(err))
        );
    }

    saveUserResults(obj: ResultModel): Observable<boolean> {
        const url = `${this.serverSvc.apiURL}/api/results/${obj.lotteryId}/save`;
        return this.http.post(url, obj).pipe(
          map((response: any) => response.data === 1),
          catchError((err: any) => throwError(err))
        );
    }

}
