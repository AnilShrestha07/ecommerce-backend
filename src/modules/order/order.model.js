const mongoose = require("mongoose")
const { OrderStatus } = require("../../config/constants")

const OrderSchema = new mongoose.Schema({
    buyer:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
    code:{
        type: String,
        unique: true,
        required: true
    },
    subTotal:{
        type: Number,
        required: true
    },
    serviceCharge: Number,
    discount: Number,
    tax: Number,
    total: Number,
    status:{
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
    },
    isPaid: Boolean,
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
    autoCreate:true,
    autoIndex: true,
    timestamps: true
})


const OrderModel = mongoose.model("Order", OrderSchema)

module.exports = OrderModel