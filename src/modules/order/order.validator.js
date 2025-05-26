const Joi = require("joi");

const CheckoutDTO = Joi.object({
    orderDetailId: Joi.array().items(Joi.string().required()).required(),
    discount : Joi.number().min(0).optional().allow(null,0).default(0)
})

module.exports = {
    CheckoutDTO
}