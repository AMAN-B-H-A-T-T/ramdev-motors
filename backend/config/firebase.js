const admin = require('firebase-admin')
require('dotenv').config()


let db ;
try{
    // const service_account = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

admin.initializeApp({
    credential : admin.credential.cert({
        type : process.env.FIREBASE_TYPE,
        project_id : process.env.PROJECT_ID,
        private_key_id : process.env.PRIVATE_KEY_ID,
        private_key : process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email : process.env.CLIENT_EMAIL,
        client_id : process.env.CLIENT_ID,
        auth_uri : process.env.AUTH_URI,
        token_uri : process.env.TOKEN_URI,
        auth_provider_x509_cert_url : process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url : process.env.CLIENT_X509_CERT_URL,
        universe_domain : process.env.UNIVERSE_DOMAIN
    }),
    databaseURL: 'https://ramdev-moters-billing-sy-1df32.firebaseio.com'
})

 db = admin.firestore()
}
catch(error){
    throw new Error(error.message)
}



module.exports = {db}