const mongoose=require('mongoose');
const friendSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    id:{
        type:String,
        unique:false,
    },
    user:{
        type:String,
        unique:false,
    },
});
const Friend=mongoose.model("Friend",friendSchema);
module.exports=Friend;