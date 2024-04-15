import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile';
import DashboardPost from '../components/DashboardPost';
import DashboardUsers from '../components/DashboardUsers';
import DashboardComment from '../components/DashboardComment';


const Dashboard = () => {
  const location = useLocation();
  const [tab,setTab] = useState("");

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
    setTab(tabFromUrl);
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* left side-> sidebar  */}
      <div className="md:w-56 ">
          <DashboardSidebar />
      </div>

      {/* right side  */}

      <div className="flex-grow ">
        <div className=" ">

        {
          tab === 'profile' && <DashboardProfile />
        }
        </div>

        {
          tab === 'posts' && <DashboardPost />
        }

        {
          tab === 'users' && <DashboardUsers />
        }
        {
          tab === 'comments' && <DashboardComment />
        }

      </div>
     
    </div>
  )
}

export default Dashboard
