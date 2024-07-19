export const login=(estate,action)=>{
    console.log(action);
    let {payload:user} = action
    estate.islogin = user;
}

export const logout= (estate,acton)=>{
    console.log("out");
    estate.islogin= "";
}

