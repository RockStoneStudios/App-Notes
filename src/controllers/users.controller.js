const userCtrl = {};
const User = require('../models/User');
const passport = require('passport')
userCtrl.renderSignUpForm = (req,res)=>{
    res.render('users/signup');
}

userCtrl.signup = async (req,res)=>{
    const errors = [];
    const {name,email,password,confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text:'Password do not match'})
    }
    if(password.length<6) {
        errors.push({text : "Password must be at least 4 characteres"});

    }
    if(errors.length>0){
        res.render('users/signup',{
            errors,
            name,
            email
        })
    }
    else{
    const emailUser = await User.findOne({email:email});
    if(emailUser){
        req.flash('error_msg','The email is already in use.');
        res.redirect('/signup');
   
       }   else {
           const newUser =  new User({name,email,password});
           newUser.password = await newUser.encryptPassword(password);
           await newUser.save();
           req.flash('sucess_msg','You are register')
           res.redirect('/signin');
        }
    }
}

userCtrl.renderSigninForm = (req,res)=>{
    res.render('users/signin');
}

userCtrl.signin = passport.authenticate('local',{
     failureRedirect :'/signin',
     successRedirect :'/notes',
     failureFlash : true
})

userCtrl.logout = (req,res)=>{
   req.logout();
   req.flash('Success_msg','you are logged out now.');
   res.redirect('/signin');
}
module.exports = userCtrl;