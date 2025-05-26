const { OrderDetailStatus } = require("../../../config/constants");
const orderDetailSvc = require("./order-detail.service")


class OrderDetailController{
     addToCart = async(req, res, next)=>{
        try {

            let {productId, quantity} = req.body;
            let loggedInUser = req.loggedInUser;
            
            const exists = await orderDetailSvc.getSingleOrderDetailByFilter({
                product: productId,
                buyer: loggedInUser._id,
                order: null,
                status: OrderDetailStatus.PENDING
            });

            let detailObj;
            let cart;

            if(exists){
                const updateData = {
                    quantity: quantity + exists.quantity,
                    price: exists.product.afterDiscount,
                    subtotal: (+quantity + exists.quantity) * exists.product.afterDiscount + exists.deliveryCharge
                };
                cart = await orderDetailSvc.updateSingleOrderDetail({_id:exists._id}, updateData)
            }else{
                 detailObj = await orderDetailSvc.transformToOrderDetailObj(req)
                 cart = await orderDetailSvc.addOrderDetail(detailObj)
            }
            

            res.json({
                data: cart,
                message: "Added to the cart ",
                status: "ADDED_IN_THE_CART",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
     };
     getMyCart = async(req,res,next)=>{
        try {
            const loggedInUser = req.loggedInUser;
            const filter = {
                order: null,
                status: OrderDetailStatus.PENDING,
                buyer: loggedInUser._id
            }
            const {data, pagination} = await orderDetailSvc.getAllOrderDetailsByFilter(filter, req.query);
            res.json({
                data: data,
                message: "Your Cart",
                status: "CART_LIST",
                options: {
                    pagination
                }
            });
        } catch (exception) {
            next(exception)
        }
     };
     removeFromCart = async(req,res,next)=>{
        try {
            const {productId, quantity} = req.body;
            const loggedInUser = req.loggedInUser;
            
            const exists = await orderDetailSvc.getSingleOrderDetailByFilter({
                product: productId,
                buyer: loggedInUser._id,
                order: null,
                status: OrderDetailStatus.PENDING
            });

        if(!exists){
            throw {
                code : 422,
                message: "Cart does not exists",
                status: "CART_NOT_FOUND"
            }
        }
        let cart;
        let msg = ''
        if(quantity <= 0 || +quantity === +exists.quantity){
            cart = await orderDetailSvc.deleteSingleOrderDetail({
                _id :exists._id
            })
            msg = "Cart item removed"
        }else{
            const updateData = {
                    quantity: exists.quantity - quantity,
                    price: exists.product.afterDiscount,
                    subtotal: (exists.quantity - quantity) * exists.product.afterDiscount + exists.deliveryCharge
                };
                cart = await orderDetailSvc.updateSingleOrderDetail({_id:exists._id}, updateData)
            msg = "Cart updated"

        }
            
        res.json({
            data: cart,
            message: msg,
            status: "CART_UPDATED"
        })
        } catch (exception) {
            next(exception)
        }
     }
}

const orderDetailCtrl = new OrderDetailController()
module.exports = orderDetailCtrl 