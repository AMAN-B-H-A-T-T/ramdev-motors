const { save_bill_service, get_bills_of_customer_service } = require("../models/bills.model")


const save_bill_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }

        const model = {
            profile_id : req.body.profile_id,
            vehicle_id : req.body.vehicle_id,
            date : req.body.date,
            service_list : req.body.service_list,
            kilometer : req.body.kilometer
        }

        let total_bill_amt = 0
        // req.body.service_list.reduce((service,curr_val)=>{return curr_val + (parseInt(service.quentity) * parseInt(service.price))},0)
        
        req.body.service_list.map((service,index)=>{
            total_bill_amt += (parseInt(service.quentity) * parseInt(service.price))
        })
        console.log(total_bill_amt)
        model.total_price = total_bill_amt
        save_bill_service(model,(error,result)=>{
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


const get_bills_of_customer_controller = async(req,res)=>{
    try{
        if(req.userDetails.role != "admin"){
            return res.status(401).send({
                "error":"error",
                "message":"Unauthorized access"
            })
        }

        get_bills_of_customer_service(req.query,(error,result)=>{
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
    save_bill_controller,
    get_bills_of_customer_controller

}