const   express     = require('express'),
        router      = express.Router();


let data = [
    {
        postTitle: "Blog testi",
        postSubTitle: "Bloğu test ediyoruz",
        image: "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_960_720.jpg"

    },
    {
        postTitle: "Manzara",
        postSubTitle: "Güzel manzara",
        image: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_960_720.jpg"

    },
    {
        postTitle: "Tesettür",
        postSubTitle: "Tesettür kadın",
        image: "https://cdn.pixabay.com/photo/2020/10/06/11/55/woman-5632026_960_720.jpg"

    }
]


router.get("/", (req,res)=>{
    res.render('home', {data:data});
});

router.get("/about", (req,res)=>{
    res.render('about');
});

router.get("/contact", (req,res)=>{
    res.render('contact');
});

router.get("/signin", (req,res)=>{
    res.render('signin');
});

router.get("/resume", (req,res)=>{
    res.render('resume');
});



module.exports = router;