import jwt from "jwt";
const authMiddleware =(req,res,next)=>{
  const authHeader = req.header.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(400).json({message:"the user is not authorized"});
  }
  const token = authHeader.split(' ')[1];
  try{
    const decoded = jwt.verify(token,"");
    req.userId = decoded.userId;
    next();
  }
  catch(err){
    return res.json({message:err})
  }
}
export default authMiddleware; 
