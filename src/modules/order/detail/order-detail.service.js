const productSvc = require("../../product/product.service")
const { OrderDetailStatus } = require("../../../config/constants");
const OrderDetailModel = require("./order-detail.model");


class OrderDetailService {
    transformToOrderDetailObj = async(req)=>{
        try {
            const {productId, quantity} = req.body;
            const loggedInUser = req.loggedInUser;


            const product = await productSvc.getSingleRowByFilter({
                _id: productId
            })
            if(!product){
                throw{
                    code: 422,
                    message: "Product not Found",
                    status: "NOT_FOUND"
                }
            }

            const orderDetail = {
                buyer: loggedInUser._id,
                order: null,
                product: productId,
                price: product.afterDiscount,
                deliveryCharge: 10000,

                quantity: quantity,
                subtotal: (product.afterDiscount * quantity) + 10000,

                seller: product.seller._id,
                status: OrderDetailStatus.PENDING,
                createdBy: loggedInUser._id
            };
         return orderDetail;
        } catch (exception) {
            throw exception
        }
    };
    addOrderDetail = async(detailObj)=>{
        try {
            const obj = new OrderDetailModel(detailObj)
            return await obj.save()
        } catch (exception) {
            throw exception
        }
    };
    getSingleOrderDetailByFilter = async(filter)=>{
        try {
            const obj = await OrderDetailModel.findOne(filter)
            .populate("buyer", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ]) 
            .populate("order", ["_id",'code', 'total', 'status', 'isPaid' ])
            .populate("product", ["_id", 'name', 'slug', 'price', 'discount', 'afterDiscount', 'seller', 'image'])
            .populate("seller", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ])
            .populate("createdBy", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ]) 
            .populate("updatedBy", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ]) 


            return obj;

        } catch (exception) {
            throw exception
        }
    };
    updateSingleOrderDetail = async(filter, updateData)=>{
        try {
            const update = await OrderDetailModel.findOneAndUpdate(filter, {$set: updateData}, {new:true})
            return update
        } catch (exception) {
            throw exception
        }
    };
    getAllOrderDetailsByFilter = async (filter, query={})=>{
        try {
            const page = +query.page || 1;
            const limit = +query.limit || 10;
            const skip = (page-1) * limit;
            const data = await OrderDetailModel.find(filter)
            .populate("buyer", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ]) 
            .populate("order", ["_id",'code', 'total', 'status', 'isPaid' ])
            .populate("product", ["_id", 'name', 'slug', 'price', 'discount', 'afterDiscount', 'seller', 'image'])
            .populate("seller", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ])
            .populate("createdBy", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ]) 
            .populate("updatedBy", ["_id", 'name', 'email', 'role','image', 'status', 'address', 'phone' ]) 
            .sort({'createdAt': "desc"})
            .skip(skip)
            .limit(limit)
            const count = await OrderDetailModel.countDocuments(filter)
            return {
                data: data,
                pagination:{
                    page: page,
                    limit: limit,
                    total: count 
                }
            }

        } catch (exception) {
            throw exception
        }
    };
    deleteSingleOrderDetail = async (filter)=>{
        try {
            const del = await OrderDetailModel.findOneAndDelete(filter)
            return del 
        } catch (exception) {
            throw exception
        }
    }
}

const orderDetailSvc = new OrderDetailService()
module.exports = orderDetailSvc
