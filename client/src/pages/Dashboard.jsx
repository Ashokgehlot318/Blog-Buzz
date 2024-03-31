import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile';


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
    <div className=''>
      {/* left side-> sidebar  */}
      <div className="">
          <DashboardSidebar />
      </div>

      {/* right side  */}

      <div className="">
        {
          tab === 'profile' && <DashboardProfile />
        }

      </div>
     
    </div>
  )
}

export default Dashboard
