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
exports.deleteAllTweetsWhenUserDeleted = exports.updateTweetRepo = exports.deleteTweetRepo = exports.createTweetRepo = exports.getAllTweetsOfUserRepo = exports.getAllTweetsRepo = exports.getTweetRepo = void 0;
const tweet_model_1 = __importDefault(require("../database/models/tweet.model"));
const getTweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = yield tweet_model_1.default.findOne({ tweetId: tweetId });
        return tweet;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getTweetRepo = getTweetRepo;
const getAllTweetsRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTweets = yield tweet_model_1.default.find();
        if (allTweets) {
            return allTweets;
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
exports.getAllTweetsRepo = getAllTweetsRepo;
const getAllTweetsOfUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userTweets = yield tweet_model_1.default.find({ adminId: userId });
        if (userTweets) {
            return userTweets;
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
exports.getAllTweetsOfUserRepo = getAllTweetsOfUserRepo;
const createTweetRepo = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield tweet_model_1.default.create(tweet);
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
exports.createTweetRepo = createTweetRepo;
const deleteTweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield tweet_model_1.default.findOneAndDelete({ tweetId: tweetId });
        if (operation) {
            return operation;
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
exports.deleteTweetRepo = deleteTweetRepo;
const updateTweetRepo = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield tweet_model_1.default.findOneAndUpdate({ tweetId: tweet.tweetId }, tweet, { new: true });
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
exports.updateTweetRepo = updateTweetRepo;
const deleteAllTweetsWhenUserDeleted = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield tweet_model_1.default.deleteMany({ adminId: userId });
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
exports.deleteAllTweetsWhenUserDeleted = deleteAllTweetsWhenUserDeleted;
