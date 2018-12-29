const express = require('express');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession=require('cookie-session');
const keys=require('./config/keys');
const passport=require('passport');

const app = express();
//deployment
var compression = require('compression');
var helmet = require('helmet');
app.use(compression());
app.use(helmet());
//

//set a view engine
app.set('view engine','ejs');


app.use(cookieSession({
	maxAge:24*60*60*1000*1000,
    keys:[keys.session.cookieKey]

}));


//initialize ppassport

app.use(passport.initialize());
app.use(passport.session());
//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,()=>{
console.log('connected to mongodb');
});

//setup routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//create home route

app.get('/',(req,res)=>{
res.render('home',{user:req.user});
});

app.listen(3000,()=>{
console.log("app listening to port 3000");
});