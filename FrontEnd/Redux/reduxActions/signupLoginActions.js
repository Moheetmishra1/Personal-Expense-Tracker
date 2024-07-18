export const login=(estate,action)=>{
    let {payload:user} = action
    estate.islogin = user;
}

export const logout= (estate,acton)=>{
    estate.islogin= null;
}

