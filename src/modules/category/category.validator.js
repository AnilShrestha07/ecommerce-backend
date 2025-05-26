const Joi = require("joi");
const { Status } = require("../../config/constants");

const CategoryDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  parentId: Joi.string().allow(null, '').default(null),
  status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
  image: Joi.string().allow(null,'').default(null)
})


module.exports = {
  CategoryDTO
}