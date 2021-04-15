const express= require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
require('./config/passpot');

//Inicializaciones
const app = express();


//Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout : 'main',
    layoutsDir : path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'),'partials'),
    extname : '.hbs'
   
}));
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.set('view engine','.hbs');

//Middlewares
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Globa Variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('Success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
    next();
})

//Routers
app.use(require('./routes/index'));
app.use(require('./routes/notes.router'));
app.use(require('./routes/user.router'));


//Static File

app.use(express.static(path.join(__dirname,'public')));


module.exports = app;