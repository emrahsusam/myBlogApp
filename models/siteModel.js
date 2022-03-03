const mongoose        =require("mongoose");

const siteSchema = new mongoose.Schema({
    homeImage       : {type:String, require:"Cannot be empty"},
    aboutImage       : {type:String, require:"Cannot be empty"},
    aboutText       : {type:String, require:"Cannot be empty"},
    contactImage       : {type:String, require:"Cannot be empty"},
    contactText       : {type:String, require:"Cannot be empty"}
});

module.exports =mongoose.model("Site", siteSchema );