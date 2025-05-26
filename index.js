const http = require("http")
const app = require("./src/config/express.config")
// req-res cycle => build express app
const httpServer = http.createServer(app);
const PORT = 9005
const HOST = "localhost" // FQDM, IP localhost => 127.0.0.1, ::1

httpServer.listen(PORT,HOST,(err)=>{
    if(!err){
        console.log("Server is running on PORT", PORT);
        console.log("press CTRL+C to discontinue server... ");
    }
});