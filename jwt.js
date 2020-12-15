
'use strict'
/**
  *Require module dependencies 
  */
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config() 
/**
 * jwt is an Internet standard for creating json based access tokens 
 * jwt tokens are in three parts : header , payload  , and signature 
 * all signed and encoded as base64url 
 * isAuthenticated is a middleware for checking if request to a protected path contains 
 * a valid token 
 * @param [Object] HTTP req , res , and a call to the next middleware 
 * @return [String] token 
*/
const isAuthenticated = (req , res , next) => {
	if ( typeof req.headers.authorization !== "undefined") {
		let token = req.headers.authorization.split(" ")[1] 
		const API_KEY = process.env.JWT_API_SECRET
		jwt.verify(token ,  API_KEY  , {
				algorithm : "HS256" ,
				issuer : "Charles E. Charles" , 
				subject : "Authorization"
			} ,  (err , user) => {
			if ( err ) {
				res.json(err)
				return 
			}else {
			   return next()
			}
		})
	}else {
		res.status(403).json({message : "Your request is missing authorization"})
		
	}
} 

module.exports = isAuthenticated