const jwt = require('jsonwebtoken')
const { verify_token } = require('./jwtHelper')

const auth = (req,res,next)=>{
    let token = req.get('authorization')
    if(!token){
        req.is_auth = false
        return next()
    }
    if(token === ""){
        req.is_auth = false
        return next()
    }
    token = token.replace("Bearer ","")
    
    const result = verify_token(token)
    if(result.error){
        req.is_auth = false
        res.status(401).send({
            "error":"error",
            "message": result.message
        })
    }

    req.is_auth = true
    req.userDetails = result.data
    return next()    
}

module.exports = {
    auth
}