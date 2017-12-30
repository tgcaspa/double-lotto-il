import { Injectable } from '@angular/core';
import { ResultModel } from "../models/result";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ArchiveService {
    onArchiveIdChanged$ = new BehaviorSubject<ResultModel>(null);

}
