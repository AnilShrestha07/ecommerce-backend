const express = require("express");
const router = require("./router.config");
require("./mongodb.config")
const cors = require("cors");
const { default: rateLimit } = require("express-rate-limit");
const { default: helmet } = require("helmet");






// application
const app = express()

//body parser
app.use(cors())
app.use(rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 30,

}))
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded());



//Route
// app.use() accepts all method

app.get('/',(req,res)=>{

    let user = {
        name: "Anil",
        age: 25,
        email: "anil@gmail.com"
    }
    
    res.json({
        data : user,
        message: "api pages",
        status: "ok",
        options: null
    })
})



app.use(router)


app.use((req,res,next)=>{
    next({
        message : "Resource not found",
        status: "NOT FOUND",
        code : 404

    })
})

app.use((error, req, res, next) => {

    console.log(error)
    
    let code = error.code || 500;
    let message = error.message || "Internal Server error...";
    let statusCode = error.status || "SERVER_ERROR";
    let detail = error.detail || null;
  
    // TODO: 


    if(error.name === "MongoServerError"){
        if(+error.code === 11000){
            code = 400;
            message = "Validation failed";
            statusCode =  "VALIDAATION_FAILED";
            detail = {}
            let field = Object.keys(error.keyPattern).pop()
            detail = {
                [field]: `${field} should be unique` 
            }
            
        }
    }
  
    res.status(code).json({
      error: detail, 
      message: message,
      status: statusCode,
      options: null
    });
  })

//export
module.exports = app;