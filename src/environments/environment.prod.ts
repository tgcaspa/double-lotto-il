import { appConfig } from './app-config';

export const environment = {...appConfig, ...{
  production: true
}};
