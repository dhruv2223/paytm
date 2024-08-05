import express from "express"; 
import zod from "zod";
import {User} from "../db.sj" ;
import signupSchema from "./signupSchema.js";
import signinnSchema from "./signinSchema.js";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware.js";
import updateSchema from "./updateSchema.js";
import {Account} from "../db.js";
const signInSchema

const app = express();
const router = express.Router();
router.post("/singup",async (req,res)=>{
 const body = req.body;
  const {success} = signupSchema.safeParse(body);
  if(!success){
    res.status(400).json({message:"Email already taken/Incorrect Inputs "});
  }
  const userExists = User.findOne({
    username:body.username;
  }) 
  if(userExists){
  return res.status(400).json({message:"Email already taken/Incorrect Inputs "});
  }
  const user = await User.create({
    username:body.username,
    password:body.password,
    firstname:body.firstname, 
    lastName:body.lastName, 

  })
  
  const userId = user_.id;
  await Account.create({
    userId:userId,
    balance:Math.floor(1+Math.random()*10000)
  })
  const token = jwt.sign({
    userId
  },"");
  res.json({message:"user created succesfully",token});

}); 
router.get("signin",(req,res)=>{
  const body = req.body; 
  const {success} = zod.safeParse(body);
  if(!success){
   return res.json({message:"invalid parameters"});
  }
  const userExists = User.findOne({
    username:body.username;
  })
  if(!userExists){
  return  res.json({message:"No such user exists"});
  }
  const checkUser = User.find({username:body.username,passaword:body.password});
  if(checkUser){
    const user = jwt.sign({userId:checkUser._id},"");
    return user;
 }
return res.status(404).json({message:"Error while logging"});
}) 
router.put("update",authMiddleware,(req,res)=>{
  const body = req.body;
  const {success} updateSchema.safeParse(body);
  if(!success){
    return res.status(400).json({message:"Check and try again"})
  }
  await User.updateOne({_id:req.useId},body);
  res.json({
    message:"updated Succesfully"
  })

})
router.get("bulk",authMiddleware,(req,res)=>{
  const filter = req.query.filter || "";
  const users = User.find({
    $or:[{firstName:{
      "$regex":filter;
    }},{lastName:{
        "$regex":filter;
      }]
  })
  res.json({user:users.map(user=>({
    username:user.username,
    firstName:user.firstName,
    lastName:user.lastName,
    _id:user._id
    
  })})

    
})


export default router;

