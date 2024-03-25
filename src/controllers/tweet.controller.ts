import { Request, Response } from "express";
import { getTweetRepo, createTweetRepo, updateTweetRepo, deleteTweetRepo, getAllTweetsRepo, getAllTweetsOfUserRepo } from "../repositories/tweet.repository";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { updateUserWhenUserCreatedRepo, updateUserWhenUserDeletedRepo } from "../repositories/user.repository";

export const getAllTweetsController = async (req:Request, res:Response) => {
    try {
        const allTweets = await getAllTweetsRepo();
        if(allTweets) {
            res.status(200).json({"Tweets": allTweets});
        } else {
            res.status(500).json({"Error": "Error getting all tweets"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const getTweetController = async (req:Request, res:Response) => {
    const tweetId = req.params.tweetId;
    try {
        const tweet = await getTweetRepo(tweetId);
        if(tweet){
            res.status(200).json({"Tweet": tweet});
        } else {
            res.status(500).json({"Error": "Error getting a tweet"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const createTweetController = async(req:Request, res: Response) => {
    const tweet = req.body;
    try {
        const success = await createTweetRepo(tweet);
        if(success){
            const success2 = await updateUserWhenUserCreatedRepo(tweet.adminId, tweet.tweetId);
            if(success2) {
                res.status(200).json({"Tweet": "Tweet created and user updated"});
            }
            else res.status(500).json({"Tweet": "Tweet created but user not updated"});
        } else {
            res.status(500).json({"Error": "Error creating a tweet"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const deleteTweetController = async(req: Request, res:Response) => {
    const tweetId = req.params.tweetId;
    try {
        const success = await deleteTweetRepo(tweetId);
        if(success){
            const success2 = await updateUserWhenUserDeletedRepo(success.adminId, success.tweetId);
            if(success2){
                res.status(200).json({"Tweet": "Tweet deleted and user updated"});
            }
            else res.status(500).json({"Tweet": "Tweet deleted but user not updated"});
        } else {
            res.status(500).json({"Error": "Error deleting a tweet"});

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const updateTweetController = async(req: Request, res:Response) => {
    const tweet = req.body;
    try {
        const success = await updateTweetRepo(tweet);
        if(success){
            res.status(200).json({"Tweet": "Tweet updated !"});
        } else {
            res.status(500).json({"Error": "Error updating a tweet"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const getAllTweetsOfUserController = async(req:Request, res:Response) => {
    const userId = req.params.userId;
    try {
        const  userTweets = await getAllTweetsOfUserRepo(userId);
        if(userTweets){
            res.status(200).json({"User Tweets": userTweets});
        } else {
            res.status(500).json({"Error": "Error getting user tweets"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}