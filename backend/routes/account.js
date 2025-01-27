import express from "express";
import authMiddleware from "./middleware.js";
import transferSchema from "./transferSchema.js";
import Account from "./account.js";
import {User,Account} from "../db.js"
const app = express();

const router = express.Router();
router.get("/balance",authMiddleware,(req,res)=>{
const user =  await Account.findOne({req.userId});
res.json({balance:user.balance}) 
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
export default router;
