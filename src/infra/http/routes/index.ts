import routeHealth from './health';
import routeValidation from './validation';

export default (app: any): any => {
  app.use('/health', routeHealth);
  app.use('/validation', routeValidation);
};
