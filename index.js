const  express          =require('express'),
    mongoose          = require("mongoose"),
        passport        =require("passport"),
        LocalStrategy   =require("passport-local"),
        expressSession  =require("express-session"),
        createError = require('http-errors'),
        path = require('path'),
        cookieParser = require('cookie-parser'),
        logger = require('morgan'),
        User            =require("./models/userModel"),
        bodyParser      =require("body-parser"),
        app             =express();


//Routes
const indexRoutes = require("./routes/indexRoutes"),
        adminRoutes=require("./routes/adminRoutes");


//App Config
mongoose.connect("mongodb://localhost/BlogApp");
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));



//Passport Config
app.use(require("express-session")({
    secret:"bu bizim güvenlik cümlemizdir.",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Share Current user info within all routes
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
}); 

//Routes Using
app.use(indexRoutes);
app.use(adminRoutes);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

const server = app.listen(5000, (err)=>{
    if(err){
        console.log(err);
    }
        console.log('App started. Port number: %d ', server.address().port);
});

