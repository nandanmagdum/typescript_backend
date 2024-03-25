"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.deleteUserController = exports.createUserController = exports.getUserController = exports.getAllUsersController = void 0;
const user_repository_1 = require("../repositories/user.repository");
const tweet_repository_1 = require("../repositories/tweet.repository");
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, user_repository_1.getAllUsersRepo)();
        if (allUsers) {
            res.status(200).json({ "Users": allUsers });
        }
        else {
            res.status(500).json({ "Error": "Error getting all users" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.getAllUsersController = getAllUsersController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield (0, user_repository_1.getUserRepo)(userId);
        if (user) {
            res.status(200).json({ "User": user });
        }
        else {
            res.status(500).json({ "Error": "Error getting a user" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.getUserController = getUserController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const success = yield (0, user_repository_1.createUserRepo)(user);
        if (success) {
            res.status(200).json({ "User": "User created !" });
        }
        else {
            res.status(500).json({ "Error": "Error creating a user" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.createUserController = createUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const success = yield (0, user_repository_1.deleteUserRepo)(userId);
        if (success) {
            const success2 = yield (0, tweet_repository_1.deleteAllTweetsWhenUserDeleted)(userId);
            if (success2) {
                res.status(200).json({ "User": "User deleted and all it's tweet deleted" });
            }
            else
                res.status(500).json({ "User": "User deleted but tweets not deleted" });
        }
        else {
            res.status(500).json({ "Error": "Error deleting a user" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.deleteUserController = deleteUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const success = yield (0, user_repository_1.updateUserRepo)(user);
        if (success) {
            res.status(200).json({ "User": "User updated !" });
        }
        else {
            res.status(500).json({ "Error": "Error updating a user" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.updateUserController = updateUserController;
