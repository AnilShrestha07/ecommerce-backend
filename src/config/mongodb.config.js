const mongoose = require("mongoose")
const { MongodbConfig } = require("./constants")

const dbInit =async ()=>{
    try {
        await mongoose.connect(MongodbConfig.url,{
            dbName: MongodbConfig.dbName,
            autoCreate: true,
            autoIndex: true
        })
        console.log("**************************DB Server Connected************************")
    } catch (exception) {
        console.log(exception)
        console.log("******************Error connecting Mongofb Server")
        
    }
}
dbInit()