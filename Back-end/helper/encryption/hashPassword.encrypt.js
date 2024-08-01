const bcrypt= require("bcryptjs");

require("dotenv").config()

let encryptPassword= async (password)=>{

    let salt = await bcrypt.genSalt(Number(process.env.salt_length));
    return await bcrypt.hash(password,salt);
}
module.exports= encryptPassword;
