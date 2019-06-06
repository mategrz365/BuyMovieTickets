require('dotenv').config({path:'.env'});
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

require('./config/passport')(passport);

const app = express();

const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser:true})
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,   
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global vars
app.use((req,res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//SASS  middleware
app.use(sassMiddleware({  
    src: './public/',
    dest: './public/',
    debug: true,
    outputStyle: 'compressed', 
}));


 //Static Folder
 app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


