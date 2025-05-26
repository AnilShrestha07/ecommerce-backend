const Joi = require("joi");
const { Status } = require("../../config/constants");

const BannerDTO = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
  url: Joi.string().uri().required(),
  image: Joi.string().allow(null,'').default(null)
})


module.exports = {
  BannerDTO
}