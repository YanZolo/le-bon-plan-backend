import express from 'express';
export function createRouter(routes) {
  const router = express.Router();
  routes.forEach(route => {
    const method = route.method.toLowerCase();
    router[method](route.path, ...[...(route.pre || []), createHandler(route)]);
  });
  return router;
}
export function createHandler({
  handler,
  responseStatus = 200
}) {
  return async (req, res) => {
    try {
      console.log('create handler ==> try catch block');
      const result = await handler(req);
      res.status(responseStatus).json(result);
    } catch (e) {
      return res.status(e.status || 500).json({
        name: e.name || 'INTERNAL_ERROR',
        message: e.message,
        status: e.status || 500,
        stack: process.env.NODE_ENV !== 'production' ? e.stack : null
      });
    }
  };
}
//# sourceMappingURL=createRouter.js.map