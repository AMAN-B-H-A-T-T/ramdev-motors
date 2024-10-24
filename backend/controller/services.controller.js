const { add_services_services, get_all_services_service, service_delete_service } = require("../models/services.model")

const add_services_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }
        add_services_services({service_name:req.body.service_name},(error,result)=>{
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

const get_all_services_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"  
            })
        }
        get_all_services_service((error,result)=>{
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

const delete_service_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }
        service_delete_service(req.query.service_id,(error,result)=>{
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
    add_services_controller,
    get_all_services_controller,
    delete_service_controller
}