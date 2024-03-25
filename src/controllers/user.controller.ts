import { Request, Response } from "express";
import { getUserRepo, createUserRepo, updateUserRepo, deleteUserRepo, getAllUsersRepo, updateUserWhenUserCreatedRepo } from "../repositories/user.repository";
import { IUserInterface } from "../database/interfaces/user.interface";
import { deleteAllTweetsWhenUserDeleted } from "../repositories/tweet.repository";

export const getAllUsersController = async (req:Request, res:Response) => {
    try {
        const allUsers = await getAllUsersRepo();
        if(allUsers) {
            res.status(200).json({"Users": allUsers});
        } else {
            res.status(500).json({"Error": "Error getting all users"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const getUserController = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    try {
        const user = await getUserRepo(userId);
        if(user){
            res.status(200).json({"User": user});
        } else {
            res.status(500).json({"Error": "Error getting a user"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const createUserController = async(req:Request, res: Response) => {
    const user = req.body;
    try {
        const success = await createUserRepo(user);
        if(success){
            res.status(200).json({"User": "User created !"});
        } else {
            res.status(500).json({"Error": "Error creating a user"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const deleteUserController = async(req: Request, res:Response) => {
    const userId = req.params.userId;
    try {
        const success = await deleteUserRepo(userId);
        if(success){
            const success2 = await deleteAllTweetsWhenUserDeleted(userId);
            if(success2){
                res.status(200).json({"User": "User deleted and all it's tweet deleted"});   
            }
            else res.status(500).json({"User": "User deleted but tweets not deleted"});
        } else {
            res.status(500).json({"Error": "Error deleting a user"});

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}

export const updateUserController = async(req: Request, res:Response) => {
    const user = req.body;
    try {
        const success = await updateUserRepo(user);
        if(success){
            res.status(200).json({"User": "User updated !"});
        } else {
            res.status(500).json({"Error": "Error updating a user"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error});
    }
}