const express= require('express');
const path = require('path');
const exphbs = require('express-handlebars');
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

//Globa Variables


//Routers
app.use(require('./routes/index'));
app.use(require('./routes/notes.router'));


//Static File

app.use(express.static(path.join(__dirname,'public')));


module.exports = app;