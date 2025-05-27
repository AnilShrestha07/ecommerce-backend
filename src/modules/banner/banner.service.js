const fileUploadSvc = require("../../services/file-upload-service");
const slugify = require("slugify");
const BannerModel = require("./banner.model");
class BannerService{
    transformCreatePayload = async(req) =>{
        try {
            let data = req.body;
           
            if(req.file){
                data.image = await fileUploadSvc.fileupload(req.file.path, 'banner/')
            }
            
            return data
        } catch (exception) {
            throw(exception)
        }
    };
    transformUpdatePayload = async (req, oldData) => {
        try {
          let data = req.body;
          if (req.file) {
            data.image = await fileUploadSvc.fileupload(req.file.path, "banner/");
          } else {
            data.image = oldData.image;
          }
    
          data.updatedBy = req.loggedInUser._id;
          return data;
        } catch (exception) {
          throw exception;
        }
      };
    createBanner = async(payload) =>{
        try {
            const banner = await BannerModel.create(payload)
            return banner;
        } catch (exception) {
            throw(exception)
        }
    };
    getAllList = async(query, filter = {})=>{
        try {
            let limit = +query.limit || 10;
            let page = +query.page || 1;
      
            let skip = (page - 1) * limit;

            let {rows: allData, count} = await BannerModel.findAndCountAll({
              where: filter,
              offset: skip,
              limit: limit
            })
            

            return {
                data: allData,
                pagination: {
                  page: page,
                  limit: limit,
                  total: count,
                },
              };
        } catch (exception) {
            throw(exception)
        }
    }
    
    getSingleRowByFilter = async (filter) => {
    try {
      let detail = await BannerModel.findOne({
        where: filter
      })
      
      return detail;
    } catch (exception) {
      throw exception;
    }
    };
    updateSingleDataByFilter = async (filter, data) => {
        try {
const [affectedCount, affectedRows] = await BannerModel.update(data, {
      where: filter,
      returning: true,
    });

    if (affectedCount === 0) {
      return null; // or throw new Error("Banner not found");
    }

    return affectedRows[0];        } catch (exception) {
          throw exception;
        }
    };
    deleteSingleRowByFilter = async(filter) => {
        try {
          const data = await BannerModel.destroy({
            where: filter
          })
          return data;
        } catch(exception) {
          throw exception
        }
      }
}

const bannerSvc = new BannerService()
module.exports = bannerSvc