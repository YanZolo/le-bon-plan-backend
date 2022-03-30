export default class PageController {
  getRegisterPage(req, res) {
    res.render("register");
    return res;
  }

  getLoginPage(req, res) {
    console.log('getLoginPage() req.headers', req.headers);
    res.render("login");
    return res;
  }

  getProfilePage(req, res) {
    const user = res.app.locals.user;
    console.log('getProfilePage res.app.locals ===> ', res.app.locals);
    console.log('getProfilePage user ===> ', user);
    res.render("profile", {
      user: user
    });
    return res;
  }

  getProductsPage(req, res) {
    res.render("products");
    return res;
  }

}
//# sourceMappingURL=PageController.js.map