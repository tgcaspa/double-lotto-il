import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigServerService {

  get apiURL(): string {
    return environment.serverEndpoint;
  }

}
