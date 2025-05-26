const router = require("express").Router()
const authRouter = require("../modules/auth/auth.router")
const brandRouter = require("../modules/brand/brand.router")
const bannerRouter = require("../modules/banner/banner.router")
const categoryRouter = require("../modules/category/category.router")
const productRouter = require("../modules/product/product.router")
const orderRouter = require("../modules/order/order.router")

router.use("/auth", authRouter)
router.use("/brand", brandRouter)
router.use("/category", categoryRouter)

router.use("/banner", bannerRouter)
router.use("/product", productRouter)
router.use("/order", orderRouter)


module.exports = router