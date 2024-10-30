import { IEnvironment } from './environment.d';

let environment: IEnvironment;

if (__DEV__) {
  environment = require('./environment.development').environment;
} else {
  environment = require('./environment').environment;
}

export { environment };
