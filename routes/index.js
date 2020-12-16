const express = require('express');
const firebase = require('firebase/app');
let auth = require('firebase/auth')
const router = express.Router();
const CompanyAdmin = require('../model/companyAdmin')
const admin = require('firebase-admin')
const database = admin.database()


const FileController = require('../controller/fileController')

const IndexController = require('../controller/indexController')
const AdminController = require('../controller/adminController')
const CompanyAdminController = require('../controller/companyAdminController')

/*--------------Home and Admin Routes--------------*/
router.get('/', IndexController.getIndex)
router.get('/waste/admin-page', AdminController.getAdminPage)
router.post('/waste/admin-page', AdminController.postAdmin)
router.get('/admin/dashboard', AdminController.getAdminDashboard)
router.get('/admin/new-companys', AdminController.getNewCompany)
router.get('/admin/approved-companys', AdminController.getApprovedCompany)
router.get('/admin/company/:companyID', AdminController.getSingleCompany)
router.get('/admin/company/:companyID/approve', AdminController.approveCompany)
router.get('/admin/logout', AdminController.getAdminLogout)


/*--------------Company Admin Routes--------------*/
router.get('/company/login', CompanyAdminController.getCompanyLogin)
router.post('/company/login', CompanyAdminController.postCompanyAdminLogin)
router.get('/company/signup', CompanyAdminController.getCompanySignup)
router.get('/forgot-password', CompanyAdminController.getForgotPassword)
router.post('/company/signup', CompanyAdminController.postCompanyAdminSignUp)
router.get('/company/verify/:companyID', CompanyAdminController.verifyEmail)
router.get('/company/dashboard', CompanyAdminController.getDashboard)
router.get('/company/bin', CompanyAdminController.getBin)
router.get('/company/bin/:binID', CompanyAdminController.getSingleBin)
router.get('/company/profile', CompanyAdminController.getCompanyProfile)
router.post('/company/profile', FileController.adminUpload.single('picture'), CompanyAdminController.updateLogo)
router.get('/company/settings', CompanyAdminController.settingsPage)
router.post('/company/settings', CompanyAdminController.postSettings)
router.get('/company/logout', CompanyAdminController.getLogout)



module.exports = router;