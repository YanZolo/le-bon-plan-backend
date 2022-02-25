import routes from '../controller2/routes.js';
import express from 'express';




export function createRouter(routes) {
    const router = express.router();

    routes.forEach(route => {
        const method = route.method.toLowerCase();

        router[method](route.path, createHandler(route))
    })
    console.log('router :>> ', router);
    return router
}


export function createHandler({ handler, responseStatus = 200 }){
    return async(req, res) => {
        try {
            const result = await handler(req);
            res.status(responseStatus).json(result);            
        } catch (err) {
            res.status(err.status||500).json({
                name: e.name || 'INTERNAL_ERROR',
                message: e.message,
                status: e.status || 500,
                stack: process.env.NODE_ENV !== 'production' ? e.stack : null
            })    
        }
    }
}