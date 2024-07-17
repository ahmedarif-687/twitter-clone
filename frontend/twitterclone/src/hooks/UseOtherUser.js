import axios from "axios";
import { USER_API_END_POINT } from "../utils/contant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getotheruser } from "../redux/userslice";

const UseOtherUser = (id) => {
    const dispatch = useDispatch(); // Declare the dispatch function

    useEffect(() => {
        const fetchotherusers = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/otherusers/${id}`, {
                    withCredentials: true
                });
                dispatch(getotheruser(response.data.otheruser)); // Use response.data.user instead of req.data.user
                console.log(response.data); // Do something with the response
                // Example: setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchotherusers(); // Call the async function inside useEffect

    }, [id, dispatch]); // Dependency array ensures useEffect runs when 'id' or 'dispatch' changes
};

export default UseOtherUser;
