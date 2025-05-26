const categoryRouter = require("express").Router();
const { UserRoles } = require("../../config/constants");
const loginCheck = require("../../middleware/auth.middleware");
const { bodyValidator } = require("../../middleware/request-validator.middleware");
const uploader = require("../../middleware/file-upload.middleware")
const categoryCtrl = require("./category.controller");
const { CategoryDTO } = require("./category.validator");

// CRUD
//create
//read 
    // list all
    // by id
    // list product by slug
    // list for home page
// update
// delete
categoryRouter.get('/for-home', categoryCtrl.categoriesForHome)   
categoryRouter.get('/:slug/products', categoryCtrl.productsByCategorySlug)

categoryRouter.post("/",loginCheck([UserRoles.ADMIN]),uploader().single('image'),bodyValidator(CategoryDTO), categoryCtrl.categoryStore);
categoryRouter.get("/",loginCheck([UserRoles.ADMIN]), categoryCtrl.listAllCategories)
categoryRouter.get("/:id",loginCheck([UserRoles.ADMIN]), categoryCtrl.categoryDetailById)
categoryRouter.put("/:id", loginCheck([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(CategoryDTO),  categoryCtrl.categoryUpdateById); 
categoryRouter.delete("/:id",loginCheck([UserRoles.ADMIN]), categoryCtrl.categoryDeleteById)






module.exports = categoryRouter;