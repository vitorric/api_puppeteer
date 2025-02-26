import { ok, ResponseController } from '@core/controller/ResponseController';

export default class HealthController {
  async check(_event: any): Promise<ResponseController> {
    return ok('Everything is fine!');
  }
}
