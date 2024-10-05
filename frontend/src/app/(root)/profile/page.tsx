"use client"
import { EditProfile } from '@/components/edit-profile'
import EditProfilePicture from '@/components/edit-profile-pic'
import { FloatingDockTabs } from '@/components/ui/floating-dock-tabs'
import React, { FormEvent, FormHTMLAttributes } from 'react'
import { useState } from 'react'
import Notification from '@/components/ui/notification'

const ProfilePage = () => {

  const [notification, setNotification] = useState(false);

  const handleSubmit = () =>{
    setNotification(true);
    setInterval(() => {
      setNotification(false);
    }, 2000);
  };

  return (
    <section className='flex justify-center items-center flex-col space-y-4 mt-4'>
        <EditProfilePicture/>
        <div className='flex flex-col items-start justify-center space-y-2'>
            {/* user name */}
            <div>
                <h1 className=' text-4xl'>John Doe</h1>
            </div>
        </div>
        <EditProfile handleSubmit={handleSubmit}/>
        <FloatingDockTabs/>
        <Notification text='Submit Successfully' visible={notification}/>
    </section>
  )
}

export default ProfilePage