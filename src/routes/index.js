const siteRouter = require("./site.route.js");
const adminRoute = require("./admin.route.js");

function route(app) {
  app.use("/api", siteRouter);
  app.use("/api/admin", adminRoute);
}

module.exports = route;
