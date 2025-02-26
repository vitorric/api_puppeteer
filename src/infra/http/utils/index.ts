
import { Request, Response, NextFunction } from 'express';

export type ResponseControllerHTTP = {
  statusCode: number;
  payload: any;
  success: boolean;
};


const handleResponse = (
  callback: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
};



const resJson = (
  response: Response,
  responseController: ResponseControllerHTTP,
): any => {
  return response.status(responseController.statusCode).jsonp({
    success: responseController.success,
    payload: responseController.payload,
  });
};

export { handleResponse, resJson };
