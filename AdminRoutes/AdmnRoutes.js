const express     = require("express");
const controller  = require("./AdminController")
const adminRouter = express.Router();
adminRouter.route("/")
    .get(controller.seed);



module.exports = adminRouter;