
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
const accountSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  balance:{
    type:Number,
    required:true
  }
})
const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);

export User;

