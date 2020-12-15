const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session      = require('express-session') 
const mongoose = require("mongoose")
const dotenv   = require("dotenv").config()
const passport     = require('passport')
const LocalStrategy = require('passport-local')
const flash     =  require('connect-flash') 
const helmet   = require("helmet")
const uuid = require("uuid")


const admin = require('firebase-admin')

var serviceAccount = require("./finalbin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://finalbin-35e3c-default-rtdb.firebaseio.com"
});
const database = admin.database()




const MongoDBStore = require('connect-mongodb-session')(session)
const indexRouter = require('./routes/index');
const app = express();
const store = new MongoDBStore({
  uri :"mongodb+srv://charles6824:charles6824@@cluster0.f6vo5.mongodb.net/smartBin?retryWrites=true&w=majority",  
  //uri :"mongodb://127.0.0.1:27017/smartBin",  
  collection : "sessions"
}) 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
	cookie : {
		maxAge : 864e5
	} , 
	secret : process.env.SESSION_SECRET ,   
  resave : false , 
  store : store , 
	saveUninitialized : true , 
	unset : "destroy" , 
	genid : (req) => {
		return uuid.v4()
	}
	
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
/**
  Configure passport 
*/

passport.serializeUser(function(user , done) {
	done(null , user._id) 
})
passport.deserializeUser(function(id , done){
	User.findById(id , function(err , user) {
		done(err , user)
	})
})


app.use('/', indexRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const CONFIG = { 
  uri :"mongodb+srv://charles6824:charles6824@@cluster0.f6vo5.mongodb.net/smartBin?retryWrites=true&w=majority", 
  //uri :"mongodb://127.0.0.1:27017/smartBin", 
  OPTIONS : { 
    useNewUrlParser : true , 
    useCreateIndex : true , 
    poolSize : 10 , 
    keepAlive : true , 
    useUnifiedTopology : true , 
    keepAliveInitialDelay : 3e6
  }
}

mongoose.connect(CONFIG.uri, CONFIG.OPTIONS) 
let db = mongoose.connection 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
