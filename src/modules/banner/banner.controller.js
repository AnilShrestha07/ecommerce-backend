const { Status } = require("../../config/constants")
const productSvc = require("../product/product.service")
const bannerSvc = require("./banner.service")

class BannerController{
    #bannerDetail

    bannerStore = async (req,res,next)=>{
        try {
            const payload = await bannerSvc.transformCreatePayload(req)
            const banner = await bannerSvc.createBanner(payload)
            res.json({
                data: banner,
                message: "Banner created successfully",
                status:"SUCCESS",
                options: null,
            })
        } catch (exception) {
            next(exception)
        }
     }


    listAllBanners = async (req,res, next)=>{
        try {
            let filter = {};
            if(req.query['search']) {
              filter = {
                name: new RegExp(req.query.search, 'i'),
              };
            }
            let {data, pagination} = await bannerSvc.getAllList(req.query,filter);
            res.json({
                data: data,
                message: "Banner list",
                status: "SUCCESS",
                option: pagination
            })
        } catch (exception) {
            next(exception)
        }
    }
    #validateBannerById = async(id) => {
        this.#bannerDetail = await bannerSvc.getSingleRowByFilter({
          _id: id
        })
        if (!this.#bannerDetail) {
          throw {
            code: 422,
            message: "Banner does not exists",
            status: "NOT_FOUND",
          };
        }
      }
    
    bannerDetailById = async (req, res, next) => {
        try {
          await this.#validateBannerById(req.params.id)
          // 
          res.json({
            data: this.#bannerDetail,
            message: "Banner detail",
            status:"SUCCESS",
            options: null
          })
        } catch(exception) {
          next(exception)
        }
      };
    bannerUpdateById = async (req, res, next) => {
        try {
          await this.#validateBannerById(req.params.id);
          // payload 
          let payload = await bannerSvc.transformUpdatePayload(req, this.#bannerDetail);
          const updateData = await bannerSvc.updateSingleDataByFilter({
            _id: this.#bannerDetail._id
          }, payload)
          res.json({
            data: updateData,
            message: "Banner Updated",
            status: "SUCCESS",
            options: null
          })
        } catch(exception) {
          next(exception)
        }
      };
    bannerDeleteById = async (req, res, next) => {
        try {
          await this.#validateBannerById(req.params.id);
    
          const del = await bannerSvc.deleteSingleRowByFilter({
            _id: this.#bannerDetail._id
          })
    
          res.json({
            data:del,
            message: "Banner deleted successfully",
            status: "SUCCESS",
            options: null
          })
    
    
        } catch(exception) {
          next(exception)
        }
      };
    
      // open api
    bannersForHome = async (req, res, next) => {
        try {
          let filter = {
            status: Status.ACTIVE
          };
          if (req.query["search"]) {
            filter = {
              ...filter,
              name: new RegExp(req.query.search, "i"),
            };
          }
          let { data, pagination } = await bannerSvc.getAllList(req.query, filter);
          res.json({
            data: data,
            message: "Banner List",
            status: "SUCCESS",
            options: {
              pagination,
            },
          });
        } catch (exception) {
          next(exception);
        }
      };
        
}


const bannerCtrl = new BannerController()
module.exports = bannerCtrl