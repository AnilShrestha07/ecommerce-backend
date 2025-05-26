const mongoose = require("mongoose")
const { Gender, Status, UserRoles, StateName } = require("../../config/constants")

const AddressSchema = new mongoose.Schema({
    houseNo: String,
    toleName: String,
    wardNo: Number,
    municipalityName: String,
    district: String,
    state:{
        type: String,
        enum: Object.values(StateName)
    }
})
const UserSchema = new mongoose.Schema({
    // defination
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.CUSTOMER
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : Object.values(Status),
        default: Status.INACTIVE,
    },
    gender: {
        type: String,
        enum: Object.values(Gender)
    },
    address:{
        billing: AddressSchema,
        shipping: AddressSchema
    },
    phone: String,
    dob: Date,
    image: {
        url: String,
        optimizedurl: String,
    },
    activationToken: String,
    isEmailVerified:{
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: String,
    expiryTokenTime: Date,


},{
    //configuration
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
