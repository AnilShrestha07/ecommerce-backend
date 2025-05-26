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
            const banner = new BannerModel(payload)
            return await banner.save()
        } catch (exception) {
            throw(exception)
        }
    };
    getAllList = async(query, filter = {})=>{
        try {
            let limit = +query.limit || 10;
            let page = +query.page || 1;
      
            let skip = (page - 1) * limit;
            let allData = await BannerModel.find(filter)
            .populate("createdBy", ["_id", "name", "email", "role", "image"])
            .populate("updatedBy", ["_id", "name", "email", "role", "image"])
            .sort({ createdAt: "desc" })
            .skip(skip)
            .limit(limit);
      let count = await BannerModel.countDocuments(filter);

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
      let detail = await BannerModel.findOne(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"]);
      return detail;
    } catch (exception) {
      throw exception;
    }
    };
    updateSingleDataByFilter = async (filter, data) => {
        try {
          const update = await BannerModel.findOneAndUpdate(
            filter,
            { $set: data },
            { new: true }
          );
          return update;
        } catch (exception) {
          throw exception;
        }
    };
    deleteSingleRowByFilter = async(filter) => {
        try {
          const data = await BannerModel.findOneAndDelete(filter)
          return data;
        } catch(exception) {
          throw exception
        }
      }
}

const bannerSvc = new BannerService()
module.exports = bannerSvc