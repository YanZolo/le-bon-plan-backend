export default class PageController {
  getRegisterPage(req, res) {
    res.render("register");
  }

  getLoginPage(req, res) {
    res.render("login");
  }

  getProfilePage(req, res) {
    const user = req.app.get("user");
    res.render("profile", {
      user: user
    });
  }

  getProductsPage(req, res) {
    res.render("products");
  }

}
//# sourceMappingURL=PageController.js.map