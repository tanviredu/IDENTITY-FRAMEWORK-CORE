const express       = require("express");
const mongoose      = require("mongoose");
const app           = express();
const config        = require("./config/config")
const morgan        = require("morgan");
const path          = require("path");
const cookieParser  = require("cookie-parser");
const bodyParser    = require("body-parser");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session       = require("express-session");
const port          = config.port || 3000
const connect       = mongoose.connect(config.mongourl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.set("view engine","ejs");
app.use("/css",express.static(path.join(__dirname,"public/css")))
app.use("/css",express.static(path.join(__dirname,"/node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"/node_modules/bootstrap/dist/js")));
app.use("/js",express.static(path.join(__dirname,"/node_modules/jquery/dist")));
app.use(session({
    secret: config.secrets,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport config
var Account = require('./Model/UserModel');

// pass the strategy with the authenticate method
// which is mongoose method of authenticat come from the
// plugin
passport.use(new LocalStrategy(Account.authenticate()));

// store user object in session
passport.serializeUser(Account.serializeUser());

//pull user object from session
passport.deserializeUser(Account.deserializeUser());




/* views have to be in the views directory */
/* This is the main enrty point */

var nav =  [
    {link:"/books",title:"Books"},
    {link:"/authors",title:"Authors"}
]

// pass the nav information
const bookRouter   = require("./BookRouter/BookRouter")(nav);
//const authorRouter = require("./AuthorRouter/AuthorRouter")(nav);
const adminRouter  = require("./AdminRoutes/AdmnRoutes");


app.get("/",(req,res)=>{
    res.render("index",
        {
            "home":"tanvir",
             nav  : nav
               });
})
app.post("/auth/signup",(req,res,next)=>{
    Account.register(new Account ({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.redirect("/")
        }
        passport.authenticate('local')(req,res,()=>{
            res.redirect("/books");
        })
    })
})
app.get('/login', function(req, res) {
    res.render('login',{nav  : nav} );
});

app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/books');
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

var canigo = function(req,res,next){
    // after sign in you will get a req.user
    if(!req.user){
        res.redirect("/login")
    }
    next();

}



app.use("/books",canigo,bookRouter);
app.use("/admin",canigo,adminRouter);
//app.use("/authors",authorRouter);

app.listen(port,()=>{
    console.log(`Server Started at port ${port}`);
})