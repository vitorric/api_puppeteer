import { NextFunction, Request, Response, Router } from 'express';

import HealthController from '@application/controllers/HealthController';

import { handleResponse, resJson } from '../../utils';

const router = Router();
const healthController: HealthController = new HealthController();

router.get(
  '/',
  handleResponse(async (request: Request, response: Response, next: NextFunction) =>
    resJson(response, await healthController.check({ ...request }))
  )
);

export default router;
