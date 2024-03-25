import { Router } from "express";
import userRouter from "./user.routes";
import tweetRouter from "./tweet.routes";
import helloRouter from "./hello.route";

const router = Router();

router.use("/hello", helloRouter);
router.use("/user", userRouter);
router.use("/tweet", tweetRouter);

export default router;