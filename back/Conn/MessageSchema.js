const mongoose=require('mongoose');
const messageSchema=mongoose.Schema({
    sender:{
        type:String,
        unique:false,
    },
    reciever:{
        type:String,
        unique:false,
    },
    message:{
        type:String,
        unique:false,
    },
},{timeStamps:true});
const Message=mongoose.model("Message",messageSchema);
module.exports=Message;
