const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BinSchema = new Schema ({
    company : {type : Schema.Types.ObjectId, ref : 'CompanyAdmin'},
    level : Number,
    name : String,
    gps : String
})

module.exports = mongoose.model("Bin" , BinSchema)