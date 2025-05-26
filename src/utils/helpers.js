const randomStringGenerator = (length = 100)=>{
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFHIJKLMMNOPQRSTUVWXYZ";
    let len = chars.length;
    let random = "";
    for(let i = 0; i < length; i++){
        let posn = Math.floor(Math.random() * (len-1))
        random += chars[posn] 
    }
    return random
}

module.exports = {
    randomStringGenerator
}