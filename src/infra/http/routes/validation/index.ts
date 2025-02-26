import { NextFunction, Request, Response, Router } from 'express';

import ValidationController from '@application/controllers/ValidationController';

import { handleResponse, resJson } from '../../utils';

const router = Router();
const validationController: ValidationController = new ValidationController();

router.get(
  '/html2pdf',
  handleResponse(async (request: Request, response: Response, next: NextFunction) => {
    const pathPDF = await validationController.html2PDF({ ...request });
    
    if (pathPDF && pathPDF !== null) {
      return response.download(pathPDF);
    }

    return resJson(response, {
      payload: {
        error: 'PDF não processado!',
      },
      statusCode: 404,
      success: false,
    });
  })
);

export default router;
