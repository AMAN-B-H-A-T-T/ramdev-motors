const {db} = require('../config/firebase')

const save_bill_service = async(model,callback)=>{
    try{
        const tot_cont = await db.collection('Bills').count().get()
        console.log(tot_cont.data())
        model["bill_no"] = tot_cont.data().count + 1
        const bill_ref = await db.collection('Bills').add(model)
        const bill = await bill_ref.get()
        const profile = await db.collection('Profile').doc(bill.data().profile_id).get()
        const vehicle = await db.collection('Vehicles').doc(bill.data().vehicle_id).get()
        const res = {
            slug : bill_ref.id,
            bill : {...bill.data()},
            customer : {...profile.data(),slug : profile.id},
            vehicle : {...vehicle.data(), slug : vehicle.id}
        }
        return callback(null,res)
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}
const get_bills_of_customer_service = async(model,callback)=>{
    try{
        let filter = {}
        console.log(model)
        if(model.mobile_no){
            const profile = await db.collection('Profile').where("customer_mobile","==",model.mobile_no).get()
            if(profile.empty){
                return callback({status_code:404,error:"The Recores not Found"})
            }
            
            filter["field"] = "profile_id",
            filter["value"] = profile.docs[0].id
        }
        else{
            const vehicle = await db.collection('Vehicles').where("vehicle_no","==",model.vehicle_no).get()
            if(vehicle.empty){
                return callback({status_code:404,error:"The Recores not Found"})
            }
            filter["field"] = "vehicle_id",
            filter["value"] = vehicle.docs[0].id
        }
        const bill_ref = await db.collection("Bills").where(filter['field'],'==',filter['value']).get()
        if(bill_ref.empty){
            return callback({status_code:404,error:"The Recores not Found"})
        }

        const bill_lst = await Promise.all(bill_ref.docs.map(async(bill,index)=>{
            const profile = await db.collection('Profile').doc(bill.data().profile_id).get()
            const vehicle = await db.collection('Vehicles').doc(bill.data().vehicle_id).get()
            return ({
                slug : bill.id,
                ...bill.data(),
                customer_profile : profile.data(),
                vehicle : vehicle.data()
            })
        }))
        return callback(null,bill_lst)
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}
module.exports = {
    save_bill_service,
    get_bills_of_customer_service
}