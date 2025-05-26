const { OrderDetailStatus, OrderStatus, PaymentMethods, UserRoles } = require("../../config/constants");
const { randomStringGenerator } = require("../../utils/helpers");
const orderDetailSvc = require("./detail/order-detail.service");
const orderSvc = require("./order.service");
const transactionSvc = require("./transactions/transaction.service");

class OrderController {
    checkout = async (req, res, next)=>{
        try {
            let {orderDetailId, discount} = req.body;
            const loggedInUser = req.loggedInUser;

            

            const {data: orderDetails} = await orderDetailSvc.getAllOrderDetailsByFilter({
                _id: {$in: orderDetailId},
                status: OrderDetailStatus.PENDING,
                order: null,
                buyer: loggedInUser._id

            })

            if(orderDetailId.length !== orderDetails.length){
                throw{
                    code: 422,
                    message: "Cart not found",
                    status:"CART_NOT_FOUND"
                }
            }

            let subtotal = 0;
            discount = discount * 100;
            orderDetails.map((od) => {
                subtotal += od.quantity * od.product.afterDiscount + od.deliveryCharge
            })

            subtotal = subtotal - discount;
            let svcCharge = subtotal * 10/100;
            subtotal += svcCharge;

            let tax =  subtotal * 0.13


            const orderObj = {
                buyer : loggedInUser._id,
                code: randomStringGenerator(15),
                subTotal: subtotal,
                serviceCharge: svcCharge,
                discount: discount,
                tax : tax,
                total: (subtotal + tax),
                status: OrderStatus.PENDING,
                isPaid: false,
                createdBy : loggedInUser._id
            }
            const order = await orderSvc.orderStore(orderObj)

            let updateData = [];
            orderDetails.map((od)=>{
                od.price = od.product.afterDiscount;
                od.subTotal = od.product.afterDiscount * od.quantity + +od.deliveryCharge;
                od.order = order._id;
                od.updatedBy = loggedInUser._id

                updateData.push(od.save());
            })

            await Promise.allSettled(updateData);

            const transactionObj = {
                order: order._id,
                transactionCode: randomStringGenerator(15),
                amount:  subtotal+tax,
                method: PaymentMethods.CASH,
                response:  null
            }

            const transaction = await transactionSvc.storeTransaction(transactionObj)

            res.json({
                data: order,
                message: "your order has been placed successfully",
                status: "ORDER_PLACED",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    };

    getMyOrders = async (req,res,next)=>{
        try {
            let loggedInUser = req.loggedInUser;
            let data = null;
            let pagination = null;

            let filter = {};

            if(req.query.status){
                filter = {
                    ...filter,
                    status: req.query.status.toLowerCase()
                }
            }
            
            if(loggedInUser.role === UserRoles.ADMIN){

                let {result, pagination: resPaging} = await orderSvc.getAllOrderByFilter(filter, req.query);
                pagination = resPaging;
                data = result 
            }else if(loggedInUser.role === UserRoles.CUSTOMER){
                filter = {
                    ...filter,
                    buyer: loggedInUser._id
                }
                let {result, pagination: resPaging} = await orderSvc.getAllOrderByFilter(filter, req.query);
                pagination = resPaging;
                data = result
            }else if(loggedInUser.role === UserRoles.SELLER){
                filter = {
                    ...filter,
                    order: {$ne: null},
                    seller: loggedInUser._id,
                    
                }
                let {data: result, pagination: resPaging} = await orderDetailSvc.getAllOrderDetailsByFilter(filter, req.query);
                pagination = resPaging;
                data = result
            }
            res.json({
                data: data,
                message: "Your Orders",
                status:"YOUR_ORDER_LIST",
                options: {
                    pagination
                }
            })
        } catch (exception) {
            
        }
    };
    getOrderDetails = async(req, res, next)=>{
        try {
            const {orderId} = req.params;
            const orderInfo = await orderSvc.getSingleOrderByFilter({
                _id: orderId
            })
            if(!orderInfo){
                throw {
                    code: 422,
                    message: "Order not Found",
                    status: "NOT_FOUND"
                }
            }

            const detail = await orderDetailSvc.getSingleOrderDetailByFilter({
                order: orderInfo._id
            })

            res.json({
                data: {
                    order: orderInfo,
                    detail
                },
                message: "Order Detail",
                status:"ORDER_DETAIL_SUCCESS",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    }

}

const orderCtrl = new OrderController()
module.exports = orderCtrl