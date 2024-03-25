import mongoose from "mongoose";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import tweetModel from "../database/models/tweet.model";

export const getTweetRepo = async (tweetId:string) :Promise<ITweetInterface | null> => {
    try {
        const tweet = await tweetModel.findOne({tweetId: tweetId});
        return tweet;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllTweetsRepo = async () : Promise<ITweetInterface[] | null> => {
    try {
        const allTweets = await tweetModel.find();
        if(allTweets) {
            return allTweets;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllTweetsOfUserRepo = async(userId:string):Promise<ITweetInterface[] | null> => {
    try {
        const userTweets = await tweetModel.find({adminId: userId});
        if(userTweets){
            return userTweets;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
} 

export const createTweetRepo = async (tweet:ITweetInterface):Promise<boolean> => {
    try {
        const operation = await tweetModel.create(tweet);
        if(operation) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteTweetRepo = async(tweetId:string):Promise<ITweetInterface | null> => {
    try {
        const operation = await tweetModel.findOneAndDelete({tweetId: tweetId});
        if(operation){
            return operation;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateTweetRepo = async(tweet:ITweetInterface):Promise<boolean> => {
    try {
        const operation = await tweetModel.findOneAndUpdate({tweetId: tweet.tweetId}, tweet, {new : true});
        if(operation) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteAllTweetsWhenUserDeleted = async(userId:string):Promise<boolean> => {
    try {
        const operation = await tweetModel.deleteMany({adminId: userId});
        if(operation){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}