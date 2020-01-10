import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigServerUrlsService {

  get apiURL(): string {
    return environment.serverEndpoint;
  }

}
