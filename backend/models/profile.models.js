const {db} = require('../config/firebase')
const { generate_token } = require('../config/jwtHelper')

const create_user_service = async (data,callback)=>{
    try{
        const mobile_check = await db.collection('Profile').where('customer_mobile','==',data.customer_mobile).get()
        if(!mobile_check.empty){
            return callback({status_code : 409,error:"customer exist"},null)
        }        
        const user_ref = await db.collection('Profile').add(data)
        const user_data = await user_ref.get()
        
        return callback(null,{...user_data.data(),slug : user_ref.id})
    }
    catch(error){
        return callback({status_code : 500,error:error.message},null)
    }
}

const login_service = async(data,callback)=>{
    try{
        const userSnapshot = await db.collection('Profile').where('customer_mobile','==',data.customer_mobile).get()
        const doc = userSnapshot.docs[0]
        const user = doc.data()
        if(userSnapshot.empty){
            return callback({status_code:404,error:"User does not exist"})
        }
        
        if(user.password == data.password && user.role == "admin"){
            const model = {
                profile_id : doc.id,
                customer_name : user.customer_name,
                customer_mobile : user.customer_mobile,
                role : user.role
            }
            const result = generate_token(model)
            if(result.error){
                return callback({status_code:500,error:result.message})
            }

            return callback(null,result.data)
        }
        else{
            return callback({status_code:401,error:"Unauthorized access"})
        }
    }
    catch(error){
        return callback({status_code:500,error:error.message})
    }
}

module.exports = {
    create_user_service,
    login_service   
}