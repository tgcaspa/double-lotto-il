import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultModel } from '../models/result';

@Injectable()
export class ArchiveService {
    onArchiveIdChanged$ = new BehaviorSubject<ResultModel>(null);

}
