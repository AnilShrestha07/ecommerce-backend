const bannerRouter = require("express").Router();
const { UserRoles } = require("../../config/constants");
const loginCheck = require("../../middleware/auth.middleware");
const { bodyValidator } = require("../../middleware/request-validator.middleware");
const uploader = require("../../middleware/file-upload.middleware")
const bannerCtrl = require("./banner.controller");
const { BannerDTO } = require("./banner.validator");

// CRUD
//create
//read 
    // list all
    // by id
    // list product by slug
    // list for home page
// update
// delete
bannerRouter.get('/for-home', bannerCtrl.bannersForHome)   

bannerRouter.post("/",loginCheck([UserRoles.ADMIN]),uploader().single('image'),bodyValidator(BannerDTO), bannerCtrl.bannerStore);
bannerRouter.get("/",loginCheck([UserRoles.ADMIN]), bannerCtrl.listAllBanners)
bannerRouter.get("/:id",loginCheck([UserRoles.ADMIN]), bannerCtrl.bannerDetailById)
bannerRouter.put("/:id", loginCheck([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(BannerDTO),  bannerCtrl.bannerUpdateById); 
bannerRouter.delete("/:id",loginCheck([UserRoles.ADMIN]), bannerCtrl.bannerDeleteById)






module.exports = bannerRouter;