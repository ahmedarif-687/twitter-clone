import { tweet } from '../models/tweetschema.js';
import { User } from '../models/userschema.js'

export const createtweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({ message: "Please fill all the fields" });
        }
        const user=await User.findById(id).select("-password")
        await tweet.create({ description, userid: id ,userDetails:user});
        return res.status(200).json({ message: "Tweet created successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deletetweet = async (req, res) => {
    try {
        const { id } = req.params;
        await tweet.findByIdAndDelete(id);
        return res.status(200).json({ message: "Tweet deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const likeordislike = async (req, res) => {
    try {
        const loggedinuserid = req.body.id;
        const tweetid = req.params.id;
        const foundTweet = await tweet.findById(tweetid);
        if (!foundTweet) {
            return res.status(404).json({ message: "Tweet not found" });
        }
        if (foundTweet.like.includes(loggedinuserid)) {
            await tweet.findByIdAndUpdate(tweetid, { $pull: { like: loggedinuserid } });
            return res.status(200).json({
                message: "Disliked successfully"
            });
        } else {
            await tweet.findByIdAndUpdate(tweetid, { $push: { like: loggedinuserid } });
            return res.status(200).json({
                message: "Liked successfully"
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




export const getalltweets = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the logged-in user
        const loggedinuser = await User.findById(id);
        if (!loggedinuser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find tweets by the logged-in user
        const loggedinusertweets = await tweet.find({ userid: id });

        // Find tweets by users that the logged-in user is following
        const followingusertweets = await Promise.all(
            loggedinuser.following.map(async (otherusersid) => {
                return await tweet.find({ userid: otherusersid });
            })
        );

        // Combine and flatten the arrays of tweets
        const allTweets = loggedinusertweets.concat(...followingusertweets);

        return res.status(200).json({ tweets: allTweets });
    } catch (error) {
        console.error("Error in getalltweets:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getfollowingtweet = async (req, res) => {

    try {

        const id = req.params.id;

        // Find the logged-in user
        const loggedinuser = await User.findById(id);
        if (!loggedinuser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find tweets by the logged-in user


        // Find tweets by users that the logged-in user is following
        const followingusertweets = await Promise.all(
            loggedinuser.following.map(async (otherusersid) => {
                return await tweet.find({ userid: otherusersid });
            })
        );

        // Combine and flatten the arrays of tweets
        const allTweets = [].concat(...followingusertweets);

        return res.status(200).json({ tweets: allTweets });


    } catch (error) {





    }






}