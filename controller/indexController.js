'use strict' 

class App {
    getIndex = (req, res, next) => {
        res.render('index', {title: 'WasteBin Management Project'})
    }

    getDashboard = (req, res, next) => {
        res.render('dashboard', {title : "ADMIN Dashboard"})
    }
    
}


const returnApp = new App()
module.exports = returnApp 