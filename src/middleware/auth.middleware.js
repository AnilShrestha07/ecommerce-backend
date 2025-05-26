const jwt  = require("jsonwebtoken");
const { AppConfig, UserRoles } = require("../config/constants");
const authSvc = require("../modules/auth/auth.service");
const loginCheck = (role = null)=>{
    return async(req,res,next)=>{
        try {
            let token = req.headers['authorization'] || null;
            if(!token){
                throw{
                    code: 401,
                    message: "Token required",
                    status: "AUTH_EMPTY_TOKEN"
                }
            }else{
                token = token.split(" ").pop()
                let data = jwt.verify(token, AppConfig.jwtSecret)
                if(data.typ === 'Bearer'){
                    let user = await authSvc.getSingleUserByFilter({
                        _id: data.sub
                    })
                    if(!user){
                        throw({
                            code: 401,
                            message: "User not found",
                            status: "AUTH_USER_NOT_FOUND"
                        })
                    }else{
                        req.loggedInUser={
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            address: user.address,
                            role: user.role,
                            gender: user.gender,
                            dob: user.dob,
                            phone: user.phone,
                            status: user.status
                        }
                        if(!role || user.role === UserRoles.ADMIN){
                            next()
                        }else{
                            if(role.includes(user.role)){
                                next()
                            }else{
                                throw({
                                    code: 403,
                                    message: "Access Denied",
                                    status: "AUTH_ACCESS_DENIED"
                                })
                            }
                        }
                    }
                }else{
                    throw{
                        code: 401,
                        message: "Unexcepted token",
                        status: "AUTH_BEARER_TOKEN_EXPECTED"
                    }
                }
            }
        } catch (exception) {
            if(exception.name === "TokenExpiredError"){
                next({
                    code: 401,
                    message: "Token Expired",
                    status:"AUTH_TOKEN_EXPIRED"
,                })
            }else{
                next(exception)
            }
            
        }
        
    }

}
module.exports = loginCheck