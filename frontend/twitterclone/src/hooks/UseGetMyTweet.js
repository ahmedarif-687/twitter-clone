import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/contant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getalltweets } from "../redux/tweetslice";

const UseGetMyTweet = (id) => {
    const dispatch = useDispatch();
    const {refresh,isActive}= useSelector(store=>store.tweet)

    const fetchTweet = async () => {
        if (!id) {
            console.error("User ID is undefined");
            return;
        }

        try {
            const response = await axios.get(`${TWEET_API_END_POINT}/getalltweet/${id}`, {
                withCredentials: true
            });
            dispatch(getalltweets(response.data.tweets));
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching tweets:", error);
        }
    };

    const followingtweethandler = async () => {

        try {
            axios.defaults.withCredentials=true
            const res = await axios.get(`${TWEET_API_END_POINT}/getfollowingtweet/${id}`)
            console.log(res)
            dispatch(getalltweets(res.data.tweets))
           
        } catch (error) {

            console.log(error)
        }


    }

    useEffect(() => {
       
        if(!isActive){
            followingtweethandler();
        }else{
            fetchTweet();
        }
      
        

    }, [isActive,refresh]);
};



export default UseGetMyTweet;
