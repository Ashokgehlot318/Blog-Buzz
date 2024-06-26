import React from 'react';
import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser, HiDocumentText,HiOutlineUserGroup,HiAnnotation, HiChartPie} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {signoutSuccess} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const DashboardSidebar = () => {
    const location = useLocation();
    const [tab,setTab] = useState("");
    const dispatch = useDispatch();
    const {currentUser, error, loading} = useSelector( (state)=> state.user);
  
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
      setTab(tabFromUrl);
    },[location.search]);


    const signoutHandler = async () =>{
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    }

  return (
    <div>
      <Sidebar className='w-full min-h-screen md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
            {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dashboard'>
              <Sidebar.Item
                active={tab === 'dashboard' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={HiUser} label=
                    {currentUser.isAdmin ? 'Admin' : 'User'} 
                    labelColor='dark'
                    as='div'>Profile</Sidebar.Item>
                </Link>
                {currentUser.isAdmin && (
                  <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item
                      active={tab === 'posts'}
                      icon={HiDocumentText}
                      as='div'
                    >
                      Posts
                    </Sidebar.Item>
                  </Link>
                )}

                {currentUser.isAdmin && (
                    <>
                      <Link to='/dashboard?tab=users'>
                        <Sidebar.Item
                          active={tab === 'users'}
                          icon={HiOutlineUserGroup}
                          as='div'
                        >
                          Users
                        </Sidebar.Item>
                      </Link>
                      <Link to='/dashboard?tab=comments'>
                        <Sidebar.Item
                          active={tab === 'comments'}
                          icon={HiAnnotation}
                          as='div'
                        >
                          Comments
                        </Sidebar.Item>
                      </Link>
                    </>
                  )}
                <Sidebar.Item  icon={HiArrowSmRight} 
                className='cursor-pointer' onClick={signoutHandler}>Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>

      </Sidebar>
    </div>
  )
}

export default DashboardSidebar
