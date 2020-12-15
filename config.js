/**
  * Non-secured configuration settings 
*/
const dotenv = require('dotenv').config() 
const MONGO_URL = process.env.MONGO_DEVELOPMENT_URL
const MONGO_OPTIONS = {
	//uri :"mongodb://127.0.0.1:27017/smartBin", 
	uri :"mongodb+srv://charles6824:charles6824@@cluster0.f6vo5.mongodb.net/smartBin?retryWrites=true&w=majority", 
    OPTIONS : {
	    useNewUrlParser : true , 
	    useCreateIndex : true , 
	    poolSize : 10 , 
	    keepAlive : true , 
	    useUnifiedTopology : true ,
	    keepAliveInitialDelay : 300000
	}
}
module.exports = MONGO_OPTIONS