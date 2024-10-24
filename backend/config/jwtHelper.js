const jwt  = require('jsonwebtoken')
require('dotenv').config()
const generate_token = (data)=>{
    try{
        const token = jwt.sign(data,process.env.SECREAT_KEY,{expiresIn:'30d'})
        return {error:false,data:token};
    }
    catch(error){
        return {error:true,message:error.message}
    }
}

const verify_token = (token)=>{
    try{
        const decoded_data = jwt.verify(token,process.env.SECREAT_KEY)
        return {error:false,data:decoded_data}
    }
    catch(error){
        console.log(error)
        return {error:true,message:error.message}
    }
}

module.exports = {
    generate_token,
    verify_token
}
