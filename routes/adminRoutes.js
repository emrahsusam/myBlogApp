const   express     =require('express'),
        passport    =require('passport'),
        User        =require("../models/userModel"),      
        router      =express.Router();


let adminActions = [
    {
        actionId:1,
        actionName:"changeHomeImage",
        displayName:"Change Home Image"
    },
  
    {

        actionId:2,
        actionName:"changeAboutImage",
        displayName:"Change About Image"
    },
    {
        actionId:3,
        actionName:"changeAboutText",
        displayName:"Change About Text"
    },
    {
        actionId:4,
        actionName:"addNewBlog",
        displayName:"Add New Blog"
    },
    {
        actionId:5,
        actionName:"ListAllBlogs",
        displayName:"List All Blogs"
    }

];

router.get("/signup", (req,res)=>{
    res.render('signup');
});

router.post("/signup", (req,res)=>{
  
    let newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/");
        });
    });
    
});

router.get("/admin", (req,res)=>{
    res.render("admin/admin", { adminActions:adminActions });
});

router.get("/signin", (req,res)=>{
    res.render("/signin");
});

router.post("/signin", passport.authenticate("local",
{
    successRedirect: "/",
    failureRedirect:"/signin"
    
    }), (req, res)=>{

    });



router.get("/signout", (req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}


module.exports = router;