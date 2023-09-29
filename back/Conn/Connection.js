const mongoose=require('mongoose');
const ConnectDb=async()=>{
    try{
        
    await mongoose.connect("mongodb://127.0.0.1:27017/projectchat");
    console.log("MongoDb Connected");
    }
    catch(err){
        console.log({err:err.message});
    }
}
module.exports=ConnectDb;