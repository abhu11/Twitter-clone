import React, { useRef } from 'react'
import { useState } from 'react'
import {
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon,
}
from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
   setTweets : React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({setTweets} : Props) {
const [input,setinput] = useState<string>('')
const [image, setimage] = useState<string>('')
const imageInputRef = useRef<HTMLInputElement>(null)

const {data :session} = useSession()
const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
const addImageToTweet =(e : React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
e.preventDefault();
if (!imageInputRef.current?.value) return;
setimage(imageInputRef.current.value)
imageInputRef.current.value ='';
setImageUrlBoxIsOpen(false);
}

const postTweet= async()=>{
   const tweetInfo: TweetBody ={
      text:input,
      username:session?.user?.name ||'Unknown User.',
      profileImg:  session?.user?.image || 'https://cdn.vectorstock.com/i/1000x1000/30/21/human-blank-face-with-eps10-vector-25623021.webp',
      image: image,
   }
   const result =await fetch('/api/addTweet',{
      body: JSON.stringify(tweetInfo),
      method: 'POST',
   })
const json = await result.json();

const newTweets = await fetchTweets();
setTweets(newTweets)
toast('Tweet Posted', {
   icon: '',
})
return json




}

const handleSubmit =(
   e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
) =>{
   e.preventDefault()
   postTweet();

   setinput('')
   setimage('')
   setImageUrlBoxIsOpen(false)
}



  return (
    <div className='flex space-x-2 p-5'>
        <img className='h-14 w-14 rounded-full object-cover'
         src={session?.user?.image ||'https://cdn.vectorstock.com/i/1000x1000/30/21/human-blank-face-with-eps10-vector-25623021.webp' }alt=''/>
         
         <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input
                value={input}
                onChange={(e) => setinput(e.target.value)}
                 type="text" placeholder="What's Happening ?" 
                className='h-24 w-full text-xl outline-none placeholder:text-xl'/>
                <div className='flex items-center'>
                    <div className=' flex space-x-2 text-twitter'>
                    <PhotographIcon onClick={() =>setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className='h-5 w-5 cursor-pointer tranisition-transform duration-150
                    ease-out hover:scale-150'/>
                       <SearchCircleIcon className='h-5 w-5 cursor-pointer tranisition-transform duration-150
                    ease-out hover:scale-150'/>
                       <EmojiHappyIcon className='h-5 w-5 cursor-pointer tranisition-transform duration-150
                    ease-out hover:scale-150'/>
                       <CalendarIcon className='h-5 w-5 cursor-pointer tranisition-transform duration-150
                    ease-out hover:scale-150'/>
                       <LocationMarkerIcon className='h-5 w-5 cursor-pointer tranisition-transform duration-150
                    ease-out hover:scale-150'
                    />
                    </div>
                    <button 
                    onClick={handleSubmit}
                    disabled={!input || !session}
                    className='rounded-full bg-twitter px-5 py-2 font-bold
                    text-white disabled:opacity-40'> Tweet</button>
                    
                </div>

                {imageUrlBoxIsOpen &&  (
                  <form className='mt-5 flex rounded-lg rounded-lf bg-twitter/80 py-2 px-4'>
                     <input
                     ref={imageInputRef}
                     className=' flex-1 bg-transparent p-2 text-white outline-none placeholder-white'
                     type="text" placeholder='Enter Image URL...'/>
                     <button 
                     type='submit' onClick={addImageToTweet}
                     className='font-bold text-white'> Add Image</button>

                     </form>
                )}

                {image && <img className='mt-10 h-40 w-full rounded-xl 
                object-contain shadow-lg' src={image} alt='' />}
            </form>
         </div>

    </div>
    

  )
}

export default TweetBox