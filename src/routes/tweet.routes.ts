import { Router } from "express";
import { createTweetController, deleteTweetController, getAllTweetsController, getAllTweetsOfUserController, getTweetController, updateTweetController } from "../controllers/tweet.controller";

const tweetRouter = Router();

tweetRouter.get("/all", getAllTweetsController);
tweetRouter.get("/all/:userId", getAllTweetsOfUserController);
tweetRouter.get("/:tweetId", getTweetController);
tweetRouter.post("/", createTweetController);
tweetRouter.delete("/:tweetId", deleteTweetController);
tweetRouter.put("/", updateTweetController);

export default tweetRouter;