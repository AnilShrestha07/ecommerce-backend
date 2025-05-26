const loginCheck = require("../../middleware/auth.middleware")
const { bodyValidator } = require("../../middleware/request-validator.middleware")
const orderDetailRouter = require("./detail/order-detail.router")
const orderCtrl = require("./order.controller")
const { CheckoutDTO } = require("./order.validator")
const { UserRoles } = require("../../config/constants")


const orderRouter = require("express").Router()


orderRouter.use('/detail', orderDetailRouter)

orderRouter.post('/checkout', loginCheck([UserRoles.CUSTOMER, UserRoles.ADMIN]), bodyValidator(CheckoutDTO), orderCtrl.checkout)
orderRouter.get('/my-orders', loginCheck(), orderCtrl.getMyOrders)
orderRouter.get('/detail/:orderId', loginCheck(), loginCheck([UserRoles.CUSTOMER, UserRoles.ADMIN]), orderCtrl.getOrderDetails)


module.exports = orderRouter