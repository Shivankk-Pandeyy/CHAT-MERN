const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true});
userSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  },{timestamps:true});
  
const User=mongoose.model("User",userSchema);
module.exports=User;