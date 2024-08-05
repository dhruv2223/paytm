import express from "express"; 
import zod from "zod";
import {User} from "../db.sj" ;
const jwt = "";
const signupSchema = zod.object({
  username:zod.string(),
  firstName:zod:string(),
  lastName:zod.string(),
  password:zod.string()
});

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
  const token = jwt.sign({
    userId
  },jwt);
  res.json({message:"user created succesfully",token});
}); 
router.get("signin",(req,res)=>{

})


export default router;

