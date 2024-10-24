const { add_vechicle_service, get_Vehicles_by_customer_service, get_vehicle_by_no_service, add_customer_vehicle_service } = require("../models/vechicle.models")

const add_vehicle_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }
        const model = {
            vehicle_no : req.body.vehicle_no,
            profile_id : req.body.profile_id
        }
        add_vechicle_service(model,(error,result)=>{
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
        console.log("first")
        throw new Error(error.message)
    }
}

const get_vehicle_customer_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }

        get_Vehicles_by_customer_service(req.query.customer_mobile,(error,result)=>{
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

const get_vehicle_by_no_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }

        get_vehicle_by_no_service(req.query.vehicle_no,(error,result)=>{
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

const add_customer_vehicle_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }
        const customerModel = {
            customer_name : req.body.customer_name,
            customer_mobile : req.body.customer_mobile,
        }
        let vehicleModel = {
            vehicle_no : req.body.vehicle_no
        }
        add_customer_vehicle_service(customerModel,vehicleModel,(error,result)=>{
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
module.exports ={
    add_vehicle_controller,
    get_vehicle_customer_controller,
    get_vehicle_by_no_controller,
    add_customer_vehicle_controller
}