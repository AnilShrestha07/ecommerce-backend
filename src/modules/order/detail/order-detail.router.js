const loginCheck = require("../../../middleware/auth.middleware")
const {UserRoles} = require("../../../config/constants")
const { bodyValidator } = require("../../../middleware/request-validator.middleware")
const { AddToCartDTO, RemoveFromCartDTO } = require("./order-detail.validator")
const orderDetailCtrl = require("./order-detail.controller")
const orderDetailRouter = require("express").Router()

orderDetailRouter.post("/", loginCheck([UserRoles.CUSTOMER, UserRoles.ADMIN]), bodyValidator(AddToCartDTO), orderDetailCtrl.addToCart)
orderDetailRouter.get("/", loginCheck([UserRoles.CUSTOMER, UserRoles.ADMIN]), orderDetailCtrl.getMyCart)
orderDetailRouter.post("/remove", loginCheck([UserRoles.CUSTOMER, UserRoles.ADMIN]), bodyValidator(RemoveFromCartDTO), orderDetailCtrl.removeFromCart)
module.exports = orderDetailRouter