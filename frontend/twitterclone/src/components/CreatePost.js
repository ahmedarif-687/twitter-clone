import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { CiImageOn } from 'react-icons/ci';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/contant';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh,getisActive } from '../redux/tweetslice';


export default function CreatePost() {
    const [description, setDescription] = useState("");
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const {isActive}= useSelector(store=>store.tweet)

    const submithandler = async () => {
        if (!description) {
            toast.error('Description cannot be empty');
            return;
        }

        try {
            console.log("Submitting post with description:", description);
            console.log("User ID:", user?._id);

            const res = await axios.post(
                `${TWEET_API_END_POINT}/create`,
                { description, id: user?._id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user?.token}` // Include the token if needed
                    },
                    withCredentials: true
                }
            );

            dispatch(getRefresh())

            if (res?.data?.success) {
                toast.success(res.data.message);
                setDescription("");  // Clear the description input after successful submission
            } else {
                toast.success(res.data.message || 'Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('An error occurred while creating the post. Please try again later.');
        }
        setDescription("")
    };

const foryouhandler =()=>{
    dispatch(getisActive(true))
}
const followinghandler =()=>{
    dispatch(getisActive(false))
}
    return (
        <div className='w-[100%] mx-auto'>
            <div>
                <div className='flex items-center justify-evenly border-b border-gray-200'>
                    <div onClick={foryouhandler} className={`${isActive ? " border-b-4 border-blue-600 " :"border-b-4 border-transparent"}hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg cursor-pointer'>For you</h1>
                    </div>
                    <div onClick={followinghandler} className={`${!isActive ? " border-b-4 border-blue-600 " :"border-b-4 border-transparent"}hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg cursor-pointer'>Following</h1>
                    </div>
                </div>
                <div>
                    <div className='flex items-center p-4'>
                        <div>
                            <Avatar src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApwMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQEDCAL/xAA7EAABAwMCAgcHAwIFBQAAAAABAAIDBAUREiEGMQcTIkFRYXEUMkKBkaGxFVLBIzNigtHw8RckcpLh/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEAAgICAgICAwAAAAAAAAAAAAECEQMhEjEEQSJRE0JS/9oADAMBAAIRAxEAPwC8UREAREQBEXBIHegOUXRV1VPSQPnqp44YYxl8kjtLQPMlV7del6zwNnFqj9u6vsteH6WE/nCAskqsOO7vx1w4ZLiX0NRZQ4AvpYzHJCCcDUHE55gZHf4KDXDpW4nllc+GphhYXbRRxDb5nJWsvnSJxFeLFUW+ve5tNNgSOMWCQCDjOPJTRFkvoOlW6wPDJXQVDX+6ZYt+XkRn/wCFbqk6V5GuLLnbRHG4YFVSu6wM8C5hwcemfVUPTyySStDTjBzk9wW+t9RFMRHDcjHIOTmN7/DKEtMuLhfpOZVXl1ovclIXlwEFbSBzYpg73ThxJbnlz2OQrJaSRuvNLG5wyd7J8jbrO/0Pcrt4G4mivdAynldorYW6Xscd3gbavxlVvZNEqRByRSQEREAREQBERAEREAREQHBKqu49LMMNxu8VLE2aOFoZR+DngkOc4/t7x6DxVgcUzyUvDtyngJEsdNIWY8dJXkqnqDBqG+jYfMIiaJdPxLc54HRVNwkqGyTmoeJHH+4RufIeAGw7lFrjKz2pxp2aBMcvY07avEL69oilIZGcPd3LvlMVPTHQ7S48zjdyu3ohR2dkFbBbw1rMukA7TmgF31PILI/V46xuhskzX/te7OVHnSMf3uB9BhfAeWPDhsRyws7L8UZtTTummPswDf3Y2A/5XTaw5ldkH3eZB2XbLPmHQ34tiV1xFsTA0dlvee8qGyVHZvZan/tw9p9yUFp/zY/kqUWO9vtFypauLHWMeMtz7wwQftt9FB2StOh0mWwsOQ083n/RbSgmzM2eQZfjsg7gfJZl2j0XJxTRx3K1Uhb2LjF1jJNXuH4QR57j5LfhUDaLg6tu1Aa2qDeoLGtz8DAc4wO7c/VX5G9sjWvY4Oa4ZBHIhaRlZlJUfaIisVCIiAIiIAiIgCIiAwL7PTU1orJq0Zpmwu6wd5GOQXk6rhja1zoAHNLjqaTuM42+xXqvimjNwsFdTNZrc+E4b4kbj8LypdmdRWSup5MbnUw7Ob5EKjfyNoRuDZjUkbGyucxmnHPJ81mxW2a5VLYYXBoDRk/6LFtkU9QZpB2iACBy3zlbiy3JlBVtfpLmjsuYPeaPRRKWtFoxSab6N7bOjekla11TU1BPg1wH8Lbt6LbQ9mBUVbXeIkBx9lIOG7lTXSmMlKXENOHBzdJB9FIYmrillyJ9ncsWOtIhFJ0UWVpHtFZcJQDy1saD9G5+62Tui/hp7BphqWPHxipeT99lL41kMCq8s/sh44r0VzX9FFs6l77fVVUNRjsmVwkafUYz91W1XRVVruclDcnGKSM76fjHcR5FekXDZVf0v2yEMoK8xsJ1mFzzkcwSNx6K+LI3KmZ5ILjaI9YDB1gjpQxhd7zicuPmvQvD7Qyx0DQ4uAp2YJ9AvO3DVI0VQEVNojdzewglw8Ack/hekqDq/YqfqW6YuqboHg3AwuvH2ceQyERFqZBERAEREAREQBERAcOXmfj2gnob1cY7i1oJqZHscBvI1ziW/YhemCcKlem2zzG609XHE4x1gELZRvokAOxHmMYIWeRdM3wPbX2QDhim6ynlkc3SHP2HgAtjUUVmZI191dE3wBGXH+V8RyfoVIy3zQk1TWAvw7bJGf5WAyz1FXKZqjQ6R5yTK8jHyA2WPFt8mdfJKKiuyZWjizhq1QCCiZIG/tjiwM/PClFg4ntt6kdFSGQSNbqLXtxsqrfZHQDUIqV48Gu3+4C2nDdzprTVHWxkDjs52DyWc4KtItGTvbotK63emtFBJWVOpzGYGlvMklRv/qfQskwbbUFviJG/hcVN+tNXSvjfWUz24yWvKjns7rg7rKO3QthccslqXdW1/mAATj5LOC/qJaVPqRNbZ0iWK4zMgLpqWR5wOvaA3PqCV29IcEc/C80jouubE5riBvtncqLM4Xq5otIo7NNkbtMsjT8iGrsunEVXarQ6w3m1ysEkJbFMJw/U3uwcdrCn8e/iUckls1HBvDtTcrpDHSTMNK939wk5b5EeK9B0sLaenihZu2NgaPQDCrHovoKmhurWV8QE7qVs3WMPZka5o0n7/XKtPK7Ma9nBkezlERamYREQBERAEREAREQHy/Ok4542Xmy8XGW41D5HSzsqDJ7wed8n7FelCvPnSBZf0biaoYdTaeV/tEbgPhJyR8jkfRYZk9M7fDatxMee3Np6Gw1BaXzzD+o9xyXO6skZJ8wu2goX1Mz45XmMdW4t09798Z8lsLq3rOGbVJBu5gbJFnvxyHzG3zW0sz6GviZJGAHjZzT7zT4HzXPCb42dOTGuVdESoLZXxMkiuUBjGovbUveS7YYDAORBJz8lra+B0tXRwtaetkfox5eCsq7RUVPRPkneyJjRzdsoJatdZxTSzua5sLT/AEmuGDjxPqtOejNYl0ZtwtcNHVWumrKSJnW1MY1tGNTScEH7LZ36kuD9fsMkjZWvADIzpLmY5g+uy3HH9ubWWKnma4xvp5mPEjRksGRk/Lms2z1cFyYIKxkcdfEAJIj3/wCNni08wR6bbrKMmlZpKKt3owrPFV/pkU1WTFWiRrOpLy4OYGgFxznByCeazL9bxca3h6jqmhzZK12W9+kRuLvwFtZYKakhM0jo4mM3L3EAAeqw7LObvxDFdg17aCmjdDSFzcdc52NcmD3YAaPHc96lNt8mZyVRqJpOGxNbbfSwU0sks2WjVNIXlo7mjPIeSt6PJY3PPG6rfhC2tnr43sDtBdrfq7sKygtPFt22Zea0nGK+jlERdZxBERAEREAREQBERAcKK9IHDhvtsbLAwGrpSXR7ZLmkYc36b+oUrXBCiS5Ki0JOElJFFhrpOFo43hzX07nsw4YIwVpoafryHhxa8fG1xa4fMbqc9Jk7LbeAJm6YK2AOBH72nB+xaoVbpGOEoD27NJG687jKEmj24zjkgpM7TT0sJEs5kq5m7t62QvwfmuLDdqSK4slq2tMuSC4ncFRqd9Y14c+o6gSHLc7AhY/6fVyvDvaIST36t/wtONrbM1NJ0olzOv1qlopGVMkfVlvaDyMEeajVygjrmiqpGF1A0ZieB7mOZaeYHoVEoLXUPa0uqaf/ADOLv4WyeysHU07q2d5lOiJkTHYd6E7YWPH3Zo2l+pIbJR22d7XVEjqx7T2WzyukDSOWziRsplS1HbLhsGMc76BVpa6Kpt93kjqJGNdG7BIdkEEAqb2K5Qz3yloYXB8srtwNwGjc/YLOm5pdkT4rG2TLheh9mpBM9pD5QMAjcN7lvF8gbL6XrQioKkeLObnJyYREVioREQBERAEREAREQBERAQbpc4fdeuF3zU7C6pocysA5lvxD6b/JedYauWCUZJ2817CcMjBVGdLHR46ikmvVpi1UjsvmiaP7J5k4/b+PRUcUa45uqI7bJ4LlbxFK1rnt30lbu2XOlpXsbVNicGg9ioizzx3j0VcUVRLQzjJ89itnU3E1eNfMeCxljknpnZDNHjUkWjDf6KJgFMKCBxdqDoodRX2+riia641ZLnNb2XPxn0HgqpppRE/Vlx+a2NbdZZ6WOEvOlo7yspYpN7ZaOaCVxRzdLo6eqmmLjlzs4yrA6FLVJU1VXfZ2nq2t6mAnvcfePy5fVV1wxw/V8W3llBSZbFjVPNjaJnefXwXpi0W2ltFuhoKGPq6eFulo/JPmTut4Y0cuXK2qMsLlEW5zBERAEREAREQBERAEREARafiniGk4atjq6tbLIMhrI4gC558Bk4Vet6craZdAsta7/wAZWEqUr6HRbS193q6ampJPa54Y9TS1rZXgaiRyweaqHizparquHqrHE+giI7UjyDKfIYyG/dVvRV9XdL7FNUzyzSMJe6SRxcdvM+eFEo/Fkw3JGy4pttN7VIaFrWYOzW8h5BRgVBiy2TZw7lL52Ok3dzWHJbI6h2XxNefMLlhk4Rpno5cKm7joj4rmjvH1WdbIaq71DYaSJxaSA+T4WD1UjtfDlMXtc+mj/wDUKYW+hZTsDI2Na0dzRhUyeSkqSJh4ju5MnPRrZqGzcMwRUbWmWQudPKR2nu1Hn5eAUtC89cXXS5WC6UdfQVMsMb29W4scRuMkfkqUWHpRuElC5lRDBUVAb/Te86AT/iwP4XVifKCZwZ48MjRbyKiK/pf4jpqzqamjpaXvAEZdkeIOdwrM4C4rPEtG4zta2djWuyzZr2kbEDuV6MyVoiIAiIgCIiAIiIAuFytdfamSltFVNCdMjYzhx+HzUN0iUrdFfdLFZDPK2je/AjbkeGT/ALCpWopupme+Ldx3OPi9FJrzdppnOjqndaDuH5ySoxK4hxwTjO2VGG7b+zbMlSS9HDn9dFlZvD0DIdcnxSYyT4BYYaHZkZz+JvitvYmh+Wbbb4W048lRz45cHZt2Raws2jowTuF901K0ciR5FbKCFzf2/hcGTFNdI9LH5EH2zIpadrcYC2MTAB5LGia/YdkLJawYw9xPkNlgvHm/RrLyscfZoeMKBtytkkPezth3gQq+sb3xvdGe47q2Lg0Clk1gNYGnYKp6J39WSQDJe84C9HDj4Ro8zPl/JKzbV7W3MMo3t1DOouxuweSsPo5kbRXNoBDWEBhzywoJb2CFpe45e7mVsY618THBry0HBJCs3souj0GOS5UT6Pbz+pWhsc07HzRdnGrLiPRSxQAiIgCIiAIiID5J5+SobpC4iudfcZ6SactponlrYWZDdu8jvK4RQaQK9qJHxbsecZ3aeX0XWHl2nIG4RFdFZH3EcOC2tocWXGIN2DtiuEWph7J1R7tGQDt3rYwwsIB049CiKrLIzo4WADbPqV3DDR2QB6IizZY1HE0jo7TVuYcERE/ZVjbGjQDjdEVl0Vl2bVjysMyvqat8Ujj1bB7rTgH1RFBc3NBUS0pjkppHRPbgtcw6SPorl4CvNZd7bIa57XvicGh+MEjzRFLK+yU965RFQsEREB//2Q==" size="40" round={true} />
                        </div>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full outline-none border-none text-xl ml-2'
                            type="text"
                            placeholder='What is happening?!'
                        />
                    </div>
                    <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                        <div>
                            <CiImageOn size={24} />
                        </div>
                        <div>
                            <button onClick={submithandler} className='bg-[#1D9BF0] rounded-full px-4 py-1 text-lg text-white text border-none'>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
