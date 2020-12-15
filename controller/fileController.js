// File management Module 
const fs        = require("fs")
const multer    = require("multer") 
const path      = require("path") 
const currentPath       = __dirname 
const directoryName     = path.dirname(currentPath) 
// Handling Upload for admin 
const adminStorage = multer.diskStorage({
    destination : function(req , file , cb) {
		cb(null ,  path.join(directoryName, '/public/uploads/profile/'))
	} , 
	filename : function(req , file , cb) {  
	    let fileName =   `${req.session.companyCode}-${file.originalname}`  
		cb(null , fileName) 
	}
})

exports.adminUpload  = multer({storage : adminStorage}) 
