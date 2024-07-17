import axios from "axios";
import { USER_API_END_POINT } from "../utils/contant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getprofile } from "../redux/userslice";

const useGetProf = (id) => {
    const dispatch = useDispatch(); // Correctly declare the dispatch function

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                    withCredentials: true
                });
                dispatch(getprofile(response.data.user)); // Use response.data.user instead of req.data.user
                console.log(response.data); // Do something with the response
                // Example: setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchData(); // Call the async function inside useEffect

    }, [id, dispatch]); // Dependency array ensures useEffect runs when 'id' or 'dispatch' changes
};

export default useGetProf;
