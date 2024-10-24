const {db} = require('../config/firebase')

const add_services_services = async(model,callback)=>{
    try{
        const service_check = await db.collection('Services').where('service_name','==',model.service_name).get()
        if(!service_check.empty){
            return callback({status_code:409,error:"Service is already exist"})
        }
        const service_ref = await db.collection('Services').add(model)
        const service = await service_ref.get()
        return callback(null,{slug:service_ref.id,...service.data()})
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}

const get_all_services_service = async(callback)=>{
    try{
        const service_ref = await db.collection('Services').get()
        if(service_ref.empty){
            return callback({status_code:404,error:"Services are not exist"})
        }

        const service_lst = service_ref.docs.map((service,index)=>{
            return ({
                slug : service.id,
                ...service.data()
            })
        })
        return callback(null,service_lst)
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}

const service_delete_service = async(service_id,callback)=>{
    try{
        await db.collection('Services').doc(service_id).delete();
        return callback(null,'service deleted successfully')
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}
module.exports = {
    add_services_services,
    get_all_services_service,
    service_delete_service
}