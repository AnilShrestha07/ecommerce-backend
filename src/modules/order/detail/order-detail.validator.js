const Joi = require("joi")

const AddToCartDTO = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required()
}) 
const RemoveFromCartDTO = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(0).required()
}) 

module.exports = {
    AddToCartDTO,
    RemoveFromCartDTO
}