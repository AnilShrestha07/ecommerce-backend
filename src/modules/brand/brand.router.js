const brandRouter = require("express").Router();
const { UserRoles } = require("../../config/constants");
const loginCheck = require("../../middleware/auth.middleware");
const { bodyValidator } = require("../../middleware/request-validator.middleware");
const uploader = require("../../middleware/file-upload.middleware")
const brandCtrl = require("./brand.controller");
const { BrandDTO } = require("./brand.validator");

// CRUD
//create
//read 
    // list all
    // by id
    // list product by slug
    // list for home page
// update
// delete
brandRouter.get('/for-home', brandCtrl.brandsForHome)   
brandRouter.get('/:slug/products', brandCtrl.productsByBrandSlug)

brandRouter.post("/",loginCheck([UserRoles.ADMIN]),uploader().single('image'),bodyValidator(BrandDTO), brandCtrl.brandStore);
brandRouter.get("/",loginCheck([UserRoles.ADMIN]), brandCtrl.listAllBrands)
brandRouter.get("/:id",loginCheck([UserRoles.ADMIN]), brandCtrl.brandDetailById)
brandRouter.put("/:id", loginCheck([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(BrandDTO),  brandCtrl.brandUpdateById); 
brandRouter.delete("/:id",loginCheck([UserRoles.ADMIN]), brandCtrl.brandDeleteById)






module.exports = brandRouter;