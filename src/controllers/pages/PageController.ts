import { Request, Response } from "express";


export default class PageController {
    getRegisterPage(req: Request, res: Response) {
        res.render("register")
        return res
    }
    getLoginPage(req: Request, res: Response) {
        console.log('getLoginPage() req.headers', req.headers)
        res.render("login")
        return res
    }
    getProfilePage(req: Request, res: Response) {
        const user = res.app.locals.user
        console.log('getProfilePage res.app.locals ===> ', res.app.locals)
        console.log('getProfilePage user ===> ', user)
        res.render("profile", { user: user })
        return res
    }
    getProductsPage(req: Request, res: Response) {
        res.render("products")
        return res
    }
} 