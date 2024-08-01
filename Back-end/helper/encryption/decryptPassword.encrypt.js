const bcrypt= require("bcryptjs");

let decryptPassword =   async (password,hashPassword)=>{
    return  await  bcrypt.compare(password,hashPassword)
}

module.exports= decryptPassword