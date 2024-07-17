import React, { useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import Rightsidebar from './Rightsidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UseOtherUser from '../hooks/UseOtherUser';
import UseGetMyTweet from '../hooks/UseGetMyTweet';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { user , otheruser } = useSelector(store => store.user);
    const navigate=useNavigate()
   useEffect(() => {
    if(!user){
      navigate('/login')
    }

    
   }, [])
   
   
    if (user?._id) {
        UseOtherUser(user?._id);
        UseGetMyTweet(user?._id);
    } else {
        console.error("User ID is undefined in Home component");
    }

    return (
        <div className='flex justify-between w-[80%] mx-auto'>
            <LeftSidebar />
            <Outlet />
            <Rightsidebar otheruser={otheruser} />
        </div>
    );
}
