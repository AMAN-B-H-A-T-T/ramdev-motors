const { create_user_service, login_service } = require("../models/profile.models")

const create_user_controller = async(req,res)=>{
    try{
        const model = {
            customer_name  : req.body.customer_name,
            customer_mobile : req.body.customer_mobile,
        }

        create_user_service(model,(error,result)=>{
            if(error){
                return res.status(error.status_code).send({
                    "error":"error",
                    "message" : error.error
                })
            }

            return res.status(200).send({
                "message":"success",
                "data" : result
            })
        })
    }
    catch(error){
        throw new Error(error.message)
    }
}


const login_controller = async(req,res)=>{
    try{
        const model = {
            customer_mobile : req.body.customer_mobile,
            password : req.body.password.trim()
        }
        login_service(model,(error,result)=>{
            if(error){
                return res.status(error.status_code).send({
                    "error":"error",
                    "message":error.error
                })
            }
            return res.status(200).send({
                "message":"success",
                "data":result
            })
        })
    }
    catch(error){
        throw new Error(error.message)
    }
}
module.exports = {
    create_user_controller,
    login_controller
}