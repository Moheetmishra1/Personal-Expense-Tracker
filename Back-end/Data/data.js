const {connect} = require("mongoose")

function connectToDatabase(url){
    return connect(`${url}`);
}

module.exports= connectToDatabase