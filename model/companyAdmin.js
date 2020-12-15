  
const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const CompanyAdminSchema = new Schema({
    companyCode : String,
    companyName : String,
    companyEmail : String,
    companyAdmin : String,   
    password : String,
    companyNumber : String,
    address : String,
    state : String,
    country : String,
    logo : String,
    verified : {type : Boolean , default : false},
    token : String,
    approved : {type : Boolean , default : false}
})

module.exports = mongoose.model('CompanyAdmin' , CompanyAdminSchema)
 