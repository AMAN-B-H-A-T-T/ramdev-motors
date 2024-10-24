const {Joi} = require('express-validation')

const profile_validation = {
    body: Joi.object({
        customer_name : Joi.string().required(),
        customer_mobile: Joi.string().regex(/^\d{10}$/).required()
    })
}

const login_validation = {
    body : Joi.object({
        customer_mobile : Joi.string().regex(/^\d{10}$/).required(),
        password : Joi.string().required()
    })
}

const vehicle_validation = {
    body : Joi.object({
        vehicle_no : Joi.string().pattern(/^[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z]{1,2}[ -]?\d{4}$/).required(),
        profile_id : Joi.string().required()
    })
}

const service_validation = {
    body : Joi.object({
        service_name : Joi.string().required()
    })
}

const bill_validation = {
    body : Joi.object({
        profile_id : Joi.string().required(),
        vehicle_id : Joi.string().required(),
        date : Joi.string().required(),
        service_list : Joi.array().required(),
        kilometer : Joi.string().required()
    })
}
module.exports = {
    profile_validation,
    login_validation,
    vehicle_validation,
    service_validation,
    bill_validation
}