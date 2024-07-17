import { User } from "../models/userschema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tweet } from "../models/tweetschema.js";

// Load environment variables
dotenv.config({
    path: "./controllers/.env"
});

// Registration Function
export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Basic validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                msg: "Please enter all fields",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedpassword = await bcryptjs.hash(password, 16);
        await User.create({
            name,
            username,
            email,
            password: hashedpassword
        });

        res.status(200).json({
            message: "User created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Login Function
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(401).json({
                message: "Please enter all fields",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User does not exist with this email",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Password is incorrect",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
            .json({
                message: `Welcome back, ${user.name}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", { expires: new Date(0) }).json({
        message: "Logged out successfully",
        success: true
    });
}


export const bookmark = async (req, res) => {
    try {
        const loggedinuserid = req.body.id;
        const tweetid = req.params.id;

        console.log("User ID:", loggedinuserid);
        console.log("Tweet ID:", tweetid);

        // Ensure user and tweet IDs are provided
        if (!loggedinuserid || !tweetid) {
            return res.status(400).json({ message: "User ID and Tweet ID are required", success: false });
        }

        const user = await User.findById(loggedinuserid);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (user.bookmark.includes(tweetid)) {
            console.log("Tweet is already bookmarked. Removing it from bookmarks.");
            await User.findByIdAndUpdate(loggedinuserid, { $pull: { bookmark: tweetid } });
            return res.status(200).json({
                message: "Tweet removed from bookmark",
                success: true
            });
        } else {
            console.log("Tweet is not bookmarked. Adding it to bookmarks.");
            await User.findByIdAndUpdate(loggedinuserid, { $push: { bookmark: tweetid } });
            return res.status(200).json({
                message: "Tweet added into bookmark",
                success: true
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getmyprofile = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await User.findById(id).select("-password")
        return res.status(200).json(
            {
                user: user,
            }
        )

    } catch (error) {

        console.log(error)
    }
}


export const getOthersUsers = async (req, res) => {

    try {
        const { id } = req.params;
        const otheruser = await User.find({ _id: { $ne: id } }).select("-password")
        if (!otheruser) {
            return res.status(404).json({ message: "currently dont have enough users", success: false })
        }
        else {
            return res.status(200).json({ otheruser })
        }

    } catch (error) {


    }
}

export const follow = async (req, res) => {
    try {
        const loggedinuserid = req.body.id; // me
        const userid = req.params.id; // other user
        const loggedinuser = await User.findById(loggedinuserid);
        const user = await User.findById(userid);

        // Check if the user is already followed
        if (!user.followers.includes(loggedinuserid)) {
            await user.updateOne({ $push: { followers: loggedinuserid } });
            await loggedinuser.updateOne({ $push: { following: userid } });
            return res.status(200).json({
                message: `followed ${user.name}`
            });
        } else {
            return res.status(400).json({
                message: "already followed"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const unfollow = async (req, res) => {
    try {
        const loggedinuserid = req.body.id; // me
        const userid = req.params.id; // other user
        const loggedinuser = await User.findById(loggedinuserid);
        const user = await User.findById(userid);

        // Check if the user is already followed
        if (loggedinuser.following.includes(userid)) {
            await user.updateOne({ $pull: { followers: loggedinuserid } });
            await loggedinuser.updateOne({ $pull: { following: userid } });
            return res.status(200).json({
                message: `User has been unfollowed`
            });
        } else {
            return res.status(400).json({
                message: `You are not following ${user.name}`
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

