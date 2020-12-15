const fs = require('fs')
const path = require('path')
const fileName = __filename
const dirName = path.dirname(fileName)

const FileHandler = require('./file')
const GenerateAccount = require('./accountGenerator')
const bcrypt = require('bcryptjs')

const CompanyAdmin = require('../model/companyAdmin')
const Bin = require('../model/bin')
const admin = require('firebase-admin')
const database = admin.database()
const binRef = database.ref('/bins')


class App {

    getCompanyLogin = (req, res, next) => {
        res.render('company-login', {title : "Company Login"})
    }

    postCompanyAdminLogin = async (req , res , next) => {
        try { 
            const {companyCode, email, password} = req.body
            let company = await CompanyAdmin.findOne({companyCode : companyCode, companyEmail : email})  
            if(company){
                let validCompany = await bcrypt.compare(password , company.password)
                if (validCompany) {
                    req.session.companyCode = company.companyCode
                    res.redirect(303, '/company/dashboard')
                }else {
                    res.render('company-login' , { error : 'Invalid Credentials'})
                }
            }else {
                res.render('company-login' , { error : 'Invalid Credentials'})
            }  
        }catch(errors) {
            res.render('error-page', {error : errors})
        }
    }

    getCompanySignup = (req, res, next) => {
        res.render('company-signup', {title : "Smart Wastebin - Signup"})
    }
    
    getForgotPassword = (req, res, next) => {
        res.render('forgot_password', {title : "Password Reset"})
    }

    postCompanyAdminSignUp = async (req, res, next) => {
        try{
            const {companyName, companyNumber, password, companyEmail, 
                companyAdminName, address, state, country} = req.body
            
            const checkCompany = await CompanyAdmin.find({ $or : [{companyName : companyName}, {companyEmail : companyEmail}]})
            if(checkCompany.length == 0){

                const companyPass = await bcrypt.hash(password , 10)
                
                const companyAdmin = await new CompanyAdmin({
                    companyName : companyName ,  
                    companyEmail : companyEmail , 
                    companyNumber : companyNumber,
                    companyAdmin : companyAdminName, 
                    password : companyPass, 
                    address  : address,
                    state : state,
                    country : country
                })
                const saveAdmin = await companyAdmin.save()
                if ( saveAdmin ) { 
                    let redirectUrl = "/company/verify/" + saveAdmin._id
                    res.redirect(redirectUrl)
                    return 
                }else{
                    throw{
                        message : "Unable to save the Company's admin"
                    }
                }
            }else{
                res.render('company-signup', {title : "Create an account", error : "Account already exists."})
            }
        }catch(err){
            res.render('error-page', {error : err})
        }
    }

    verifyEmail = async (req, res, next) => {
        try{
            if(req.params.companyID){
                const companyAdmin = await CompanyAdmin.findOne({_id : req.params.companyID})
                if(companyAdmin){
                    res.render('verify-page', {companyAdmin : companyAdmin, title : "Verify Email"})
                }else{
                    throw{
                        message : "You can't access this page."
                    }
                }
            }
        }catch(err){
            res.render('error-page', {error : err})
        }
    }

    getDashboard = async (req , res , next) => {
        try{
            if(req.session.companyCode){
                const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
                const bin = await Bin.find({company : companyAdmin._id})
    
                res.render('company-admin-dashboard' , { title  : "Smart Bin - CompanyAdmin", companyAdmin : companyAdmin, bins : bin.length,
                 dash_active : "active"})
            }else{
                res.redirect(303, '/company/login')
            }
        }catch(err){
            res.render('error-page', {error : err})
        }
    }
    getBin = async (req, res, next) =>{
        try{
            if(req.session.companyCode){
                const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
                let allBin = binRef.orderByKey().on('value', snapshot =>{
                    console.log(snapshot.val())
                    if(snapshot.val().length != 0){
                        console.log(snapshot.val())
                        res.render('bin', {title: "Smart Bin - List Of Bins",companyAdmin: companyAdmin, bins: snapshot.val(), bin_active : "active"})
                    }else{
                        res.render('bin', {title: "Smart Bin - List Of Bins", companyAdmin: companyAdmin, noBin: "You Haven't Created any bin yet", bin_active : "active"})
                    }
                })
                
            }
        }
        catch(err){
            res.render('error-page', {error : err})
        }
    }
    // getBin = async (req, res, next) =>{
    //     try{
    //         if(req.session.companyCode){
    //             const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
    //             const bin = await Bin.find({company : companyAdmin._id})
    //             if(bin.length != 0){
    //                 res.render('bin', {title: "Smart Bin - List Of Bins", companyAdmin: companyAdmin, bins: bin, bin_active : "active"})
    //             }
    //             else{
    //                 res.render('bin', {title: "Smart Bin - List Of Bins", companyAdmin: companyAdmin, noBin: "You Haven't Created any bin yet", bin_active : "active"})
    //             }
    //         }
    //         else{
    //             res.redirect(303, '/company/login')
    //         }
    //     }
    //     catch(err){
    //         res.render('error-page', {error : err})
    //     }
    // }
    
    // getCreateBin = async (req, res, next) =>{
    //     try{
    //         if(req.session.companyCode){
    //             const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
    //             const bin = await Bin.find({company : companyAdmin._id})
    //                 res.render('create-bin', {title: "Smart Bin - Create Bins", companyAdmin: companyAdmin, bins: bin, bin_active : "active"})
                
    //          } else{
    //             res.redirect(303, '/company/login')
    //         }
    //     }
    //     catch(err){
    //         res.render('error-page', {error : err})
    //     }

        
    // }
    // postCreateBin = async (req, res, next) =>{
    //     try{
    //         if(req.session.companyCode){
    //             const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})

    //             const {name,level, gps} = req.body
    //             const bin = await new Bin({
    //                 name : name,
    //                 company : companyAdmin._id,
    //                 gps : gps,
    //                 level : level
    //             })
    //             const saveBin = await bin.save()
    //             if ( saveBin ) { 
    //                 let redirectUrl = "/company/bin/"
    //                 res.redirect(303, redirectUrl)
    //                 return 
    //             }else {
    //                 throw {
    //                     message : "Unable to save the Bin to the Database."
    //                 }
    //                 return 
    //           }   
    //     }else{
    //         res.redirect(303, '/company/login')
    //     }
    // }
    //     catch(err){
    //         res.render('error-page', {error : err})
    //     }
    // }

    getSingleBin = async (req , res , next) => {
        try{
            if(req.session.companyCode){
                const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
                let allBin = binRef.orderByChild('bin_id').on('value', snapshot =>{
                    res.render('single-bin', {companyAdmin : companyAdmin, title : "Smart Bin - Single Bin", bin : snapshot.val(), success : req.flash('success')})
                })
                
                
            }else{
                res.redirect(303, '/company/login')
            }
        }
        catch(err){
            res.json({message : err.message})
        }
    }


    getCompanyProfile = async (req, res, next) => {
        try{
            if(req.session.companyCode){
                const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
                res.render('company-profile', {title : 'Smart Bin - Company Profile', companyAdmin : companyAdmin, 
                    error : req.flash('error'), success : req.flash('success')})
            }else{
                res.redirect(303, '/company/login')
            }
        }catch(err){
            res.render('error-page', {error : err})
        }
    }

    updateLogo = async (req, res, next) => {
        try{
            if(req.session.companyCode){
                const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
                if(req.file){
                    FileHandler.createDirectory("./public/uploads/companys/" + req.session.companyCode + "/logo/")
                    CompanyAdmin.findByIdAndUpdate(companyAdmin._id, {
                        logo : req.file.filename
                    }, {new : true, useFindAndModify : false}, (err , item) => {
                        if(err){
                            console.log(err)
                        }else{

                            FileHandler.moveFile(req.file.filename , "./public/uploads/profile" , "./public/uploads/companys/" + req.session.companyCode + "/logo/") 

                            req.flash('success', 'Logo changed successfully')
                            res.redirect('/company/profile')
                        }
                    })
                }else{
                    req.flash('error', 'You need to upload an Image.')
                    res.redirect('/company/profile')
                }
            }else{
                res.redirect(303, '/company/login')
            }
        }catch(err){
            res.render('error-page', {error : err})
        }
    }

    settingsPage = async(req, res, next) => {
        try{
            if(req.session.companyCode){
                const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
                res.render('admin-settings', {title : "Settings",
                    companyAdmin : companyAdmin, success : req.flash('success')})
            }else{
                res.redirect(303, '/company/login')
            }
        }catch(err){
            res.render('error-page', {error : err})
        }
    }

    postSettings = async(req, res, next) => {
        try{
            if(req.session.companyCode){
                const {oldPassword, newPassword} = req.body
                const companyAdmin = await CompanyAdmin.findOne({companyCode : req.session.companyCode})
                let validPassword = await bcrypt.compare(oldPassword , companyAdmin.password)
                if(validPassword){
                    let harshedPassword = await bcrypt.hash(newPassword , 10)
                    CompanyAdmin.findByIdAndUpdate(companyAdmin._id, {
                        password : harshedPassword
                    }, {new : true, useFindAndModify : false}, (err, item) => {
                        if(err) {
                            console.log(err)
                        }else {
                            req.flash('success', 'Password changed successfully.')
                            res.redirect(303, "/company/settings")
                            return
                        }
                    })
                }else{
                    res.render("admin-settings", {error : "Old Password is wrong!", title : "Settings",
                    companyAdmin : companyAdmin, success : req.flash('success')})
                }
            }else{
                res.redirect(303, '/student')
            }
        }catch(err) {
            res.render('error-page', {error : err})
        }
    }
    getLogout = (req , res , next ) => {
        try {
            if (req.session.companyCode) {
                delete req.session.companyCode
                res.redirect(303 , '/company/login')
            }else {
                throw new Error("Problem signing out. We will handle this shortly")
            }
        }catch(err) {
            res.render('error-page', {error : err})
        }
    }
}
const returnApp = new App()

module.exports = returnApp 