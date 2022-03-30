import { Request, Response } from "express";


export default class PageController {
    getRegisterPage(req: Request, res: Response) {
        res.render("register")
    }
    getLoginPage(req: Request, res: Response) {
        res.render("login")
    }
    getProfilePage(req: Request, res: Response) {
        const user = req.app.get("user")
        res.render("profile", { user: user })
    }
    getProductsPage(req: Request, res: Response) {
        res.render("products")
    }
}