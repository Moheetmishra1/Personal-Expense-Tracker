let amountCheck= (amount)=>{
    if(!amount){
        return "Amount is Mandatory"
    }else if(Number(amount) ==="NaN"){
        return "Number format is incorrect."
    }
    return ""
}


exports.amountCheck=amountCheck