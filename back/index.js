const express=require('express');
const http=require('http');
const app=express();
const port=process.env.PORT || 8000;
const ConnectDb=require('./Conn/Connection')
ConnectDb();
//SCHEMA
const User=require('./Conn/UserSchema');
const fr=require('./Conn/Friends');
const Message=require('./Conn/MessageSchema');
const cors=require('cors');
const bcrypt = require('bcrypt');
//SOCKET STUFF
const USERS = [];
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);
io.on('connect',(socket)=>{
    console.log("User Connected");
    socket.on('joined',(data)=>{
        console.log(data);
        console.log(USERS)
        USERS.push(data);
        console.log(`${data.name} Has Joined`);
    })
    socket.emit('welcome',{user:"Admin:",message:`Welcome To The Chat`})
    socket.broadcast.emit('userJoined',{user:"Admin",message:`NEW User Has Joined`});
    socket.on('msg',(msg,name)=>{
        io.emit('sendmsg',{user:name,message:msg})
        console.log(name,msg);
        
    })
    socket.emit('recv',)
    socket.on('disconnected',()=>{
        socket.broadcast.emit('leave',{user:"Admin:",message:"User Has Left"})
        console.log('User Left');
    })
})   
//MIDDLEWARE
app.use(express.json());
app.use(cors());
//SERVER STARTED
server.listen(port,()=>{
    console.log(`Server Running At Port ${port}`);
})
//RESTFUL API
//REGISTER;
app.post('/Register',async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const dummy= await User.findOne({email});
        if(!dummy){
            const user=new User({
            name,
            email,
            password,
        });
        await user.save();
        return res.status(201).json({message:"Created"});
        }
        else{
             return res.status(400).json("ALREADY");
        }
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
});
//LOGIN;
app.post('/Login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({
            email
        });
        const isMatch=await bcrypt.compare(password,user.password);
        if(!user){
            console.log("NOT AN USER");
            return res.status(400).json({message:"NOT AN USER"});
        }
        if(!isMatch){
            return res.status(400).json({message:"WRONG PASSWORD"});
        }
        res.status(200).json({message:"OK LOGIN"});
        console.log(isMatch)
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
});
//LOGIN GET API TO FETCH ALL RECORDS
app.get('/login',async(req,res)=>{
    try{
        const user=await User.find({});
        res.json(user);
    }
    catch(err){ 
        console.log("ERROR");
    }
})
//SINGLE USER GET
app.get('/login/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const user=await User.findById({
            _id:id
        })
        res.json(user);
    }
    catch(err){
        console.log(err)
    }
})
//UPDATE INFORMATION
app.put('/UpdateUser/:id',async(req,res)=>{
    const {id}=req.params
    const {name,email}=req.body;
    const mail=await User.findOne({email:email});
    if(mail){
        res.status(400).json({message:"Email exists"})
    }
    try{ 
    const user=await User.findByIdAndUpdate({_id:id},{name,email});
    await user.save();
    res.status(200).json("Updated");
    }
    catch(err){
        console.log({err:err.message});
    }
})
//ADD FRIEND
app.post('/friends/:id',async(req,res)=>{
    const {name,email,id,user}=req.body;
    const dup=await fr.findOne({
        id:id
    });
    console.log(req.body);
    try{
        if(!dup){
            const friend=await new fr({
                name,
                email,
                id,
                user,
            });
            await friend.save();
            return res.status(200).json({message:"FRIEND ADDED"});
        }
        else{
            return res.status(400).json("ALREADY");
        }
    }
    catch(err){
        console.log({err:err.message});
    }
})
//GET FRIEND
app.get("/friends/:id",async(req,res)=>{
    try{
        const user=await fr.find({});
        res.json(user);
    }
    catch(err){
        console.log(err)
    }
})
//DELETE FRIEND
app.delete('/friendsdel/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await fr.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED"})
    }
    catch(err){
        console.log(err);
    }
})
//MESSAGES
app.post('/messages',async(req,res)=>{
    console.log(req.body)
    const {sender,reciever,message}=req.body;
    if(message===""){
        return res.status(200).json({message:"EMPTY"})
    }
    const msg=await new Message({
        sender,
        reciever,
        message,
    });
    await msg.save();
    res.status(200).json({message:"MSG SENT"})
});
//GET MESSAGES
app.get('/messages',async(req,res)=>{
    const msg=await Message.find({});
    res.json(msg);
})
//DELETE MESSAGE
app.delete('/messages/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await Message.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED"})
    }
    catch(err){
        console.log(err);
    }
})
