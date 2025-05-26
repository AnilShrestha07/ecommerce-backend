const authRouter = require("express").Router();
const authCtrl = require("./auth.controller");
const {bodyValidator} = require("../../middleware/request-validator.middleware");
const {registerDataDTO, loginDTO, ForgetPasswordDTO, resetPasswordDTO} = require("./auth.validator")
const uploader = require("../../middleware/file-upload.middleware");
const loginCheck = require("../../middleware/auth.middleware");


// uploader().none()
// uploader().single()  single image
// uploader().array() multi image
// uploader().fields([{name:"image", maxcount:4}])

authRouter.post("/register",uploader().single('image'), bodyValidator(registerDataDTO), authCtrl.register)
authRouter.get("/activate", authCtrl.verifyActivationToken)
authRouter.post("/login",bodyValidator(loginDTO), authCtrl.login)
authRouter.get("/me", loginCheck(), authCtrl.getLoggedInUserProfile)
authRouter.get("/refresh", authCtrl.refreshToken)
authRouter.post("/forget-password",bodyValidator(ForgetPasswordDTO), authCtrl.sendForgetPasswordRequest)
authRouter.get("/verify-forget-token/:token", authCtrl.verifyForgetPasswordToken)
authRouter.put("/reset-password/:token",bodyValidator(resetPasswordDTO), authCtrl.resetPasswordRequest)


module.exports = authRouter