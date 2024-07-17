import React from 'react';
import { CiHome, CiHashtag, CiUser, CiBookmark } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/contant';
import toast from 'react-hot-toast';
import { useDispatch} from 'react-redux';
import { getuser ,getotheruser,getprofile} from '../redux/userslice';

export default function LeftSidebar() {
      const dispatch=useDispatch()
  
    const navigate=useNavigate()
    const logouthandler=async()=>{
        try{
            axios.defaults.withCredentials = true
        const res= await axios.get(`${USER_API_END_POINT}/logout`)
              dispatch(getuser(null))
              dispatch(getotheruser(null))
              dispatch(getprofile(null))
            navigate('/login')
             toast.success(res.data.message)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='w-[20%]'>
            <div className='ml-4'>
                {/* {image} */}
            </div>
            <Link to={'/'} className='block my-4'>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <CiHome size={24}/>
                    <h1 className='font-bold text-lg ml-2'>Home</h1>
                </div>
            </Link>
            <Link to={'/explore'} className='block my-4'>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <CiHashtag size={24}/>
                    <h1 className='font-bold text-lg ml-2'>Explore</h1>
                </div>
            </Link>
            <Link to={'/notifications'} className='block my-4'>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <IoIosNotificationsOutline size={24}/>
                    <h1 className='font-bold text-lg ml-2'>Notifications</h1>
                </div>
            </Link>
            <Link to={'/profile/:id'} className='block my-4'>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <CiUser size={24}/>
                    <h1 className='font-bold text-lg ml-2'>Profile</h1>
                </div>
            </Link>
            <Link to={'/bookmarks'} className='block my-4'>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <CiBookmark size={24}/>
                    <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                </div>
            </Link>
            <Link to={'/logout'} className='block my-4'>
                <div onClick={logouthandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <AiOutlineLogout size={24}/>
                    <h1 className='font-bold text-lg ml-2'>Logout</h1>
                </div>
            </Link>
            <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button>
        </div>
    );
}
