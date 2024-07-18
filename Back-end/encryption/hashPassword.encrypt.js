const bycrypt = require("bcryptjs")
require("dotenv").config()

let encryptPassword= async (password)=>{

    let salt = await bycrypt.genSalt(8);
    return await bycrypt.hash(password,salt);
}
module.exports= encryptPassword;
