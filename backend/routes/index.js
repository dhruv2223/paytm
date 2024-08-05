import express from "express";
import userRouter from "./user.js";
import cors from 'cors';
import accountRouter from "./account.js";

const app = express(); 
const router = express.Router();
router.use("/user",userRouter);
router.use("/account",accountRouter);

export default router;


