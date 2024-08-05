import express from "express";
import authMiddleware from "./middleware.js";
import Account from "./account.js";
const app = express();

const router = express.Router();
router.get("/balance",authMiddleware,(req,res)=>{
const user =  await Account.findOne({req.userId});
res.json({balance:user.balance}) 
})
export default router;
