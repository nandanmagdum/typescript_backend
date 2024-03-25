import mongoose from "mongoose";
import { IUserInterface } from "../database/interfaces/user.interface";
import userModel from "../database/models/user.model";

export const getUserRepo = async (userId:string) :Promise<IUserInterface | null> => {
    try {
        const user = await userModel.findOne({userId: userId});
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllUsersRepo = async () : Promise<IUserInterface[] | null> => {
    try {
        const allUsers = await userModel.find();
        if(allUsers) {
            return allUsers;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createUserRepo = async (user:IUserInterface):Promise<boolean> => {
    try {
        const operation = await userModel.create(user);
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

export const deleteUserRepo = async(userId:string):Promise<boolean> => {
    try {
        const operation = await userModel.findOneAndDelete({userId: userId});
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

export const updateUserRepo = async(user:IUserInterface):Promise<boolean> => {
    try {
        const operation = await userModel.findOneAndUpdate({userId: user.userId}, user, {new : true});
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

export const updateUserWhenUserCreatedRepo = async(userId:string, tweetId:string):Promise<boolean> => {
    try {
        const operation = await userModel.findOneAndUpdate(
            {userId : userId},
            {$push: {tweets: tweetId}}
        );
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

export const updateUserWhenUserDeletedRepo = async(userId:string, tweetId:string):Promise<boolean> => {
    try {
        const operation = await userModel.findOneAndUpdate(
            {userId : userId},
            {$pull: {tweets: tweetId}}
        );
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