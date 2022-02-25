import express from 'express';
import routes from "../controllers/products/_routes.js";

export let createRouter = (routes) => {
    const router = express.Router()

    routes.forEach((route) => {
        const method = route.method.toLowerCase()

        router[method](route.path, createHandler(route))

    })
   
    return router
}


export function createHandler({ handler, responseStatus = 200 }) {
    console.log('handler :>> ', handler);
    return async (req, res) => {
        try {
            const result = await handler(req);
            res.status(responseStatus).json(result);
        } catch (e) {
            res.status(e.status || 500).  json({
                name: e.name || 'INTERNAL_ERROR',
                message: e.message,
                status: e.status || 500,
                stack: process.env.NODE_ENV !== 'production' ? e.stack : null
            })
        }
    }
}

  