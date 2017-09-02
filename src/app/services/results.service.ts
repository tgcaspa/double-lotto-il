import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ResultsService {


    constructor(private http: Http) {}

    getLastResultsFromPais() {
        const url = '/api/results/pais/last';


    }

    getResultsByIdFromPais(id: number) {
        const url = '/api/results/pais/:id';

    }

    getResultsByPassportAndPhone(params: object) {

    }

}
