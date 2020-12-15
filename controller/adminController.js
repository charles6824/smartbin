'use strict' 

const FileHandler = require('./file')
const GenerateAccount = require('./accountGenerator')
const Admin = require('../model/admin')
const CompanyAdmin = require('../model/companyAdmin')
 
class App {
    getAdminPage = (req, res, next) => {
        res.render('admin', {title : "Admin Portal"})
    }

    postAdmin = async (req , res , next) => { 
        try {
            let admin = await Admin.findOne({email: req.body.username, password: req.body.password})
            if(admin){
                req.session.adminEmail = admin.email
                res.redirect('/admin/dashboard')
            }else{
                res.render('admin' , {error : "Invalid Credentials"}) 
                return 
            }  
        }catch(err){
            res.render('admin', {error : err})
        }
    }

    getAdminDashboard = async (req , res , next) => {
        if(req.session.adminEmail){
            try{
                const validAdmin = await Admin.findOne({email : req.session.adminEmail})
                if(validAdmin){
                    const newCompanys = await CompanyAdmin.find({approved : false})
                    const approvedCompanys = await CompanyAdmin.find({approved : true})
                    res.render('adminDashboard', {admin : validAdmin, title : "Admin Dashboard", newCompanys : newCompanys.length, 
                        approvedCompanys : approvedCompanys.length, dash_active : "active"})
                }else{
                    throw{
                        message: "Session not found or expired"
                    }
                }
            }catch(err){
                res.json(err.message)
            }
        }else{
            res.redirect(303, '/admin')
        }
    }

    getNewCompany = async (req , res , next) => {
        if(req.session.adminEmail){
            try{
                const validAdmin = await Admin.findOne({email : req.session.adminEmail})
                const newCompanys = await CompanyAdmin.find({approved : false})
                    
                if(newCompanys.length != 0){
                    res.render('admin-new-companys', {admin : validAdmin, title : "New Companies Page", 
                    newCompanys : newCompanys, new_active : "active"})
                }else{
                    res.render('admin-new-companys', {admin : validAdmin, title : "New Companies Page", 
                    noCompany : "No new Company available Yet.", new_active : "active"})
                } 
                
            }catch(err){
                res.json(err.message)
            }
        }else{
            res.redirect(303, '/admin')
        }
    }

    getApprovedCompany = async (req , res , next) => {
        if(req.session.adminEmail){
            try{
                const validAdmin = await Admin.findOne({email : req.session.adminEmail})
                const approvedCompanys = await CompanyAdmin.find({approved : true})
                if(approvedCompanys.length != 0){
                    res.render('admin-approved-companys', {admin : validAdmin, title : "Approved Companies", 
                    approvedCompanys : approvedCompanys, approved_active : "active"})
                }else{
                    res.render('admin-approved-companys', {admin : validAdmin, title : "Approved Companies Page", 
                    noCompany : "Approved Companies will appear here. Looks like there's none yet.", approved_active : "active"})
                }    
            }catch(err){
                res.json(err.message)
            }
        }else{
            res.redirect(303, '/admin')
        }
    }

    getSingleCompany = async (req , res , next) => {
        if(req.session.adminEmail){
            try{
                if(req.params.companyID){
                    const validAdmin = await Admin.findOne({email : req.session.adminEmail})
                    const company = await CompanyAdmin.findOne({_id : req.params.companyID})
                    res.render('single-company', {admin : validAdmin, title : company.companyName, 
                        company : company, success : req.flash('success')})
                }else{
                    throw{
                        message: "You can't access this page."
                    }
                }
            }catch(err){
                res.json({message : err.message})
            }
        }else{
            res.redirect(303, '/admin')
        }
    }

    approveCompany = async (req, res, next) => {
        if(req.session.adminEmail){
            try{
                const totalCompany = await CompanyAdmin.find({approved : true})
                const code = GenerateAccount(totalCompany, "001", "companyCode", 1, 3)
                CompanyAdmin.findByIdAndUpdate(req.params.companyID , {
                    approved : true, companyCode : code
                } ,{new : true, useAndModify : false}, (err , item) => {
                    if(err){
                        res.status(500)
                        return
                    }else{
                        FileHandler.createDirectory("./public/uploads/companys/" + code)

                        req.flash('success', "You have approved this account. Company is now free to login.")
                        let redirectUrl = '/admin/company/' + req.params.companyID 
                        res.redirect(303, redirectUrl)
                    }
                })
            }catch(err){
                res.send(err)
            }
        }else{
            res.redirect(303, '/admin')
        }
    }

    getAdminLogout = (req , res , next ) => {
        try {
            if (req.session.adminEmail) {
                delete req.session.adminEmail 
                res.redirect(303 , '/admin')
            }else {
                throw new Error("Problem signing out. We will handle this shortly")
            }
        }catch(error) {
            res.status(400).send(error)
        }
    }
    
}


const returnApp = new App()

module.exports = returnApp 