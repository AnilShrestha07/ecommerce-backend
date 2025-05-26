const { CloudinaryConfig } = require("../config/constants")
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

class FileUploadService{
    constructor(){
        cloudinary.config({
            cloud_name: CloudinaryConfig.cloudName,
            api_key: CloudinaryConfig.apiKey,
            api_secret:CloudinaryConfig.apiSecret,
        })
    }
    fileupload = async(filePath, dir ='')=>{
        try {
            const {public_id, secure_url} = await cloudinary.uploader.upload(
                filePath,{
                    folder:'/ecom-api-38/'+ dir
                }
            )
            const optimizedUrl = cloudinary.url(public_id,{
                quality: 80,
                fetch_format:"auto"
            })

            fs.unlinkSync(filePath)

            return{
                url : secure_url,
                optimizedUrl: optimizedUrl
            }
            
        } catch (exception) {
            throw{
                code: 422,
                message: "file upload error in cloudinary",
                status: "CLOUDINARY_FILE_UPLOAD_ERROR"
            }
        }
    }
}

const fileUploadSvc = new FileUploadService()
module.exports = fileUploadSvc