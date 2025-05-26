const bannerRouter = require("express").Router();
const bannerCtrl = require("./banner.controller")

// CRUD
//create
//read 
    // list all
    // by id
    // list product by slug
    // list for home page
// update
// delete

bannerRouter.post("/", bannerCtrl.bannerStore);
bannerRouter.get("/", bannerCtrl.listAllBanners)
bannerRouter.get("/for-home", bannerCtrl.bannersForHome)
bannerRouter.get("/:id", bannerCtrl.bannerById)
bannerRouter.put("/:id", bannerCtrl.bannerUpdateById)
bannerRouter.delete("/:id", bannerCtrl.bannerDeleteById)









module.exports = bannerRouter;