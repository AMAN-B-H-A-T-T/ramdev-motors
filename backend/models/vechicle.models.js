const {db} = require('../config/firebase')


const add_vechicle_service = async(data,callback)=>{
    try{
        const vechicle_check = await db.collection('Vehicles').where('vehicle_no','==',data.vehicle_no).get()
        if(!vechicle_check.empty){
            return callback({"status_code":409,"error":"vehicle is already exist"})
        }
        const vehicle_Ref =  await db.collection('Vehicles').add(data)
        const vehicle_data = await vehicle_Ref.get()
        return callback(null,{...vehicle_data.data(),slug:vehicle_Ref.id})
    }
    catch(error){
        console.log("second")
        return callback({status_code:500,error:error.message})
    }
}

const get_Vehicles_by_customer_service = async(customer_mobile,callback)=>{
    try{

        const customer_ref = await db.collection('Profile').where('customer_mobile','==',customer_mobile).get()
        if(customer_ref.empty){
            return callback({status_code:404,error:"no Customer found"})
        }
        const vechicle_ref = await db.collection('Vehicles').where('profile_id','==',customer_ref.docs[0].id).get()
        if(vechicle_ref.empty){
            const res = {
                customer : {slug : customer_ref.docs[0].id,...customer_ref.docs[0].data()},
                vehicles : []
            }
            return callback(null,res)
        }

        const vehicle_lst = await Promise.all(vechicle_ref.docs.map(async(vechicle,index)=>{
            return ({
                slug : vechicle.id,
                ...vechicle.data(),
            })
        }))

        return callback(null,{customer : {slug : customer_ref.docs[0].id,...customer_ref.docs[0].data()},vehicles : vehicle_lst})
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}

const get_vehicle_by_no_service = async(vehicle_no,callback)=>{
    try{
        const vehicle_ref = await db.collection('Vehicles').where("vehicle_no","==",vehicle_no).get()
        if(vehicle_ref.empty){
            return callback({status_code:404,error:"Vehicle not found"})
        }
        const customer_profile = await db.collection('Profile').doc(vehicle_ref.docs[0].data().profile_id).get()
        if(!customer_profile.exists){
            return callback({status_code:404,error:"Customer not found"})
        }
        return callback(null,{vehicle:{slug:vehicle_ref.docs[0].id,...vehicle_ref.docs[0].data()},customer : {slug:customer_profile.id,...customer_profile.data()}})
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}

const add_customer_vehicle_service = async(customerModel,vehicleModel,callback)=>{
    try{
        console.log(customerModel.customer_mobile)
        const mobile_check = await db.collection('Profile').where('customer_mobile','==',customerModel.customer_mobile).get()
        if(!mobile_check.empty){
            return callback({status_code : 409,error:"customer exist"},null)
        }        
        const user_ref = await db.collection('Profile').add(customerModel)
        const user_data = await user_ref.get()
        vehicleModel.profile_id = user_ref.id
        const vechicle_check = await db.collection('Vehicles').where('vehicle_no','==',vehicleModel.vehicle_no).get()
        if(!vechicle_check.empty){
            return callback({"status_code":409,"error":"vehicle is already exist"})
        }
        const vehicle_Ref =  await db.collection('Vehicles').add(vehicleModel)
        const vehicle_data = await vehicle_Ref.get()
        const res = {
            customer : {slug : user_ref.id,...user_data.data()},
            vehicle : {slug : vehicle_Ref.id , ...vehicle_data.data()}
        }

        return callback(null,res)
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}
module.exports = {
    add_vechicle_service,
    get_Vehicles_by_customer_service,
    get_vehicle_by_no_service,
    add_customer_vehicle_service
}