import React from 'react'
//import Image from 'next/image';
import {
    HashtagIcon,
    BellIcon,
    BookmarkIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    HomeIcon,
    MailIcon,
    CollectionIcon,
  } from "@heroicons/react/outline";
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const {data: session} = useSession()

  return (
    <div className='col-span-2 flex flex-col items-center px-4
      md:items-start'>
        <img src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-jumbo-v4.jpg?quality=75&auto=webp" width="50" height="50" alt=''/>
        <SidebarRow Icon= {HomeIcon} title="Home"/>
        <SidebarRow Icon= {HashtagIcon} title="Explore"/>
        <SidebarRow Icon= {BellIcon} title="Notification"/>
        <SidebarRow Icon= {MailIcon} title="Message"/>
        <SidebarRow Icon= {BookmarkIcon} title="Bookmarks"/>
        <SidebarRow Icon= {CollectionIcon} title="List"/>
        <SidebarRow  onClick ={session ? signOut : signIn}     Icon= {UserIcon} title= {session ?"Sign out" : "Sign In"}/>
        <SidebarRow Icon= {DotsCircleHorizontalIcon} title="More"/>

      <div className='text-[#d9d9d9] flex items-center justify-center hoverAnimation
        xl:-mr-5'>
          <img src='https://pbs.twimg.com/profile_images/1534456578924892160/6067NvqF_400x400.jpg'
           alt=''
            className=' h-10 w-10 rounded-full xl:mr-2.5'/>
          <div className=' leading-5 
            cursor-pointer 
            text-twitter transition-all duration-500 ease-out 
            active:scale-125'> 
        <a href='https://twitter.com/home '/>
                     <p className='font-bold'> Abhishek Vishvakarma</p>
               <a href='https://twitter.com/home' 
                       className='text-[#6e767d]'> @abhishek11 </a>
          </div>
      </div>

        
       
    </div>
  )
}

export default Sidebar