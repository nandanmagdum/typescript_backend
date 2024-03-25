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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserWhenUserDeletedRepo = exports.updateUserWhenUserCreatedRepo = exports.updateUserRepo = exports.deleteUserRepo = exports.createUserRepo = exports.getAllUsersRepo = exports.getUserRepo = void 0;
const user_model_1 = __importDefault(require("../database/models/user.model"));
const getUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ userId: userId });
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserRepo = getUserRepo;
const getAllUsersRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_model_1.default.find();
        if (allUsers) {
            return allUsers;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllUsersRepo = getAllUsersRepo;
const createUserRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield user_model_1.default.create(user);
        if (operation) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createUserRepo = createUserRepo;
const deleteUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield user_model_1.default.findOneAndDelete({ userId: userId });
        if (operation) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.deleteUserRepo = deleteUserRepo;
const updateUserRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield user_model_1.default.findOneAndUpdate({ userId: user.userId }, user, { new: true });
        if (operation) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserRepo = updateUserRepo;
const updateUserWhenUserCreatedRepo = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield user_model_1.default.findOneAndUpdate({ userId: userId }, { $push: { tweets: tweetId } });
        if (operation) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserWhenUserCreatedRepo = updateUserWhenUserCreatedRepo;
const updateUserWhenUserDeletedRepo = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield user_model_1.default.findOneAndUpdate({ userId: userId }, { $pull: { tweets: tweetId } });
        if (operation) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserWhenUserDeletedRepo = updateUserWhenUserDeletedRepo;
