const mongoose=require('mongoose');
const chatSchema=mongoose.Schema({
    chat:{
        type:String,
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }],
    groupAdmin:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
});
const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;