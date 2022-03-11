import express, {Request, Response} from 'express';
export interface RoutesOptions {
  path: string;
  method: string;
  handler: Function;
  responseStatus?: number;
}

export function createRouter(routes : RoutesOptions[]) {
  const router = express.Router();
  routes.forEach((route) => {
    const method = route.method.toLowerCase();
    router[method](route.path, createHandler(route));
  });
  return router;
}

export function createHandler({ handler, responseStatus = 200 }) {
  return async (req: Request, res: Response) => {
    try {
      const result = await handler(req);
      res.status(responseStatus).json(result);
    } catch (e: any) {
      res.status(e.status || 500).json({
        name: e.name || 'INTERNAL_ERROR',
        message: e.message,
        status: e.status || 500,
        stack: process.env.NODE_ENV !== 'production' ? e.stack : null
      });
    }
  };
}
