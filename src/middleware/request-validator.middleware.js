const bodyValidator = (schema)=>{
    return async(req,res,next)=>{
        try{
            let payload = req.body;
            await schema.validateAsync(payload,{
                abortEarly: false
            })
            next()

        }catch(exception){
            
            let errBag = {}
            if(exception.details){
                exception.details.map((error)=>{
                    let field = error.path[0]
                    let msg = error.message
                    errBag[field] = msg;
                })
            }
            next({
                detail: errBag,
                code: 400,
                message: "Validation failed",
                status:"VALIDATION_FAILED"
            })
        }
    }
}
module.exports = {
    bodyValidator
}
