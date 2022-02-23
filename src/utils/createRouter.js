const express = require('express')
const { routes } = require("../controllers/products/_routes");

function createHandler ({handler, responseStatus = 200}) {
    return async (req, res) => {
        try {
            const result = await handler(req);
            res.status(responseStatus).json(result);
        } catch(e) {
            res.status(e.status || 500).json({
                name: e.name || 'INTERNAL_ERROR',
                message: e.message,
                status: e.status || 500,
                stack: process.env.NODE_ENV !== 'production' ? e.stack : null
            })
        }
    }
}

module.exports.createHandler = createHandler

module.exports.createRouter = (routes) => {
    const router = express.Router()

    routes.forEach((route) => {
        const method = route.method.toLowerCase()
 
        router[method](route.path, createHandler(route))
    })

    return router
}