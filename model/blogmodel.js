const mongoose=require("mongoose");
const blogmodel=mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    description:{
        type:String,
        required:true
    },
    auther:{
        type:String,
        required:false,
        default:"john"
    },
    autherAge:{
        type:Number,
        required:false
    }
},{
    timestamps:true
})
const blog=mongoose.model("blog",blogmodel);
module.exports=blog;