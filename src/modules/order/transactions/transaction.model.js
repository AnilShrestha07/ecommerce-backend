const mongoose = require("mongoose")
const { PaymentMethods } = require("../../../config/constants")

const TransactionSchema = new mongoose.Schema({
    order:{
        type: mongoose.Types.ObjectId,
        ref: "Order",
        required: true
    },
    transactionCode:{
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min : 100
    },
    method:{
        type: String,
        default: PaymentMethods.CASH
    },
    response:{
        type: String
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const TransactionModel = mongoose.model("Transaction", TransactionSchema)
module.exports = TransactionModel