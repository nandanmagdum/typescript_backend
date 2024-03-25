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
exports.getAllTweetsOfUserController = exports.updateTweetController = exports.deleteTweetController = exports.createTweetController = exports.getTweetController = exports.getAllTweetsController = void 0;
const tweet_repository_1 = require("../repositories/tweet.repository");
const user_repository_1 = require("../repositories/user.repository");
const getAllTweetsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTweets = yield (0, tweet_repository_1.getAllTweetsRepo)();
        if (allTweets) {
            res.status(200).json({ "Tweets": allTweets });
        }
        else {
            res.status(500).json({ "Error": "Error getting all tweets" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.getAllTweetsController = getAllTweetsController;
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const tweet = yield (0, tweet_repository_1.getTweetRepo)(tweetId);
        if (tweet) {
            res.status(200).json({ "Tweet": tweet });
        }
        else {
            res.status(500).json({ "Error": "Error getting a tweet" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.getTweetController = getTweetController;
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.createTweetRepo)(tweet);
        if (success) {
            const success2 = yield (0, user_repository_1.updateUserWhenUserCreatedRepo)(tweet.adminId, tweet.tweetId);
            if (success2) {
                res.status(200).json({ "Tweet": "Tweet created and user updated" });
            }
            else
                res.status(500).json({ "Tweet": "Tweet created but user not updated" });
        }
        else {
            res.status(500).json({ "Error": "Error creating a tweet" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.createTweetController = createTweetController;
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const success = yield (0, tweet_repository_1.deleteTweetRepo)(tweetId);
        if (success) {
            const success2 = yield (0, user_repository_1.updateUserWhenUserDeletedRepo)(success.adminId, success.tweetId);
            if (success2) {
                res.status(200).json({ "Tweet": "Tweet deleted and user updated" });
            }
            else
                res.status(500).json({ "Tweet": "Tweet deleted but user not updated" });
        }
        else {
            res.status(500).json({ "Error": "Error deleting a tweet" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.deleteTweetController = deleteTweetController;
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.updateTweetRepo)(tweet);
        if (success) {
            res.status(200).json({ "Tweet": "Tweet updated !" });
        }
        else {
            res.status(500).json({ "Error": "Error updating a tweet" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.updateTweetController = updateTweetController;
const getAllTweetsOfUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const userTweets = yield (0, tweet_repository_1.getAllTweetsOfUserRepo)(userId);
        if (userTweets) {
            res.status(200).json({ "User Tweets": userTweets });
        }
        else {
            res.status(500).json({ "Error": "Error getting user tweets" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error });
    }
});
exports.getAllTweetsOfUserController = getAllTweetsOfUserController;
