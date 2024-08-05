
import mongoose from "mongoose";

const {Schema} = mongoose;
mongoose.connect("")
const userSchema= new Schema({
  userName:{
    type:String,
    required:true,
    unique:true,
    minLength:3,
    maxLength:30,
    lowerCase:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    minLength:6
  },
  firstName:{
    type:String, 
    required:true,
    trim:true,
    maxLength:50
  },
  lastName:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
  }
});

const User = mongoose.model('User',userSchema);
export default User;
