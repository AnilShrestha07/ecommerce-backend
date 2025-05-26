const mongoose = require("mongoose")
const OrderModel = require("../order.model")
const { OrderDetailStatus } = require("../../../config/constants")
const OrderDetailSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    order:{
        type: mongoose.Types.ObjectId,
        ref: "Order",
        default: null
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity:{
        type: Number,
        min: 1,
        required: true
    },
    price:{
        type: Number,
    },
    deliveryCharge: Number,
    subtotal:{
        type: Number,
        required: true
    },
    seller:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(OrderDetailStatus),
        default: OrderDetailStatus.PENDING
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})


const OrderDetailModel = mongoose.model('OrderDetail', OrderDetailSchema)

module.exports = OrderDetailModel  