const express = require('express');
const firebase = require('firebase/app');
let auth = require('firebase/auth')
const router = express.Router();
const CompanyAdmin = require('../model/companyAdmin')
const admin = require('firebase-admin')
const database = admin.database()
const firebaseConfig = {
    "apiKey": "AIzaSyAGvaBLvQAjJAMBLgZkRPYtkhBbgYnqaPU",
    "authDomain": "finalbin-35e3c.firebaseapp.com",
    "databaseURL": "https://finalbin-35e3c-default-rtdb.firebaseio.com",
    "projectId": "finalbin-35e3c",
    "storageBucket": "finalbin-35e3c.appspot.com",
    "messagingSenderId": "887888512503",
    "appId": "1:887888512503:web:b987d613ed083aee569af2",
    "measurementId": "G-GX8J1JVNC5"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)


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