
import React, { useEffect, useState } from 'react'
import {Tweet} from '../typings'
import Timeago from 'react-timeago'
import { Comment } from '../typings'
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'

interface Props {
    tweet: Tweet 
}


function Tweet({tweet} : Props) {
     const [comments, setComments] = useState<Comment[]>([])
     const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
     const [Input, setInput] = useState<string>('')
     const { data : session } = useSession()

    const refreshComments = async () => {
        const comments: Comment[]= await fetchComments(tweet._id)
        setComments(comments);
    }
    useEffect(() => {
        refreshComments()
    },[])
    console.log(comments)
    const handleSubmit= (e:React.FormEvent<HTMLFormElement>) =>
    e.preventDefault()




  return (
    <div className='flex flex-col sapce-x-3 border-y p-5 border-gray-100'>
        <div className='flex space-x-3'>
      <img className='h-10 w-10 rounded-full object-cover' src={tweet.profileImg}alt=''/>
      <div>
        <div className='flex items-center space-x-1'>
            <p className='mr-1 font-bold'>{tweet.username}</p>
            <p className='hidden text-sm text-gray-500 sm:inline'
            >@{tweet.username.replace(/\s+/g,'').toLowerCase()}</p>

            <Timeago className='text-sm text-gray-500'
            date={tweet._createAt}
            />
        </div>
        <p className='pt-1'>
            {tweet.text && <img src={tweet.image} alt ='' className='m-5 ml-0 mb-1
            max-h-60 rounded-lg object-cover shadow-sm'/>}
        </p>


      </div>
      </div>
      <div className='mt-5 flex justify-between'>
        <div 
          onClick={() => session && setCommentBoxVisible (!commentBoxVisible)}
        className='flex cursor-pointer items-center space-x-3 text-gray-400 '>
            <ChatAlt2Icon className='h-5 w-5' />
            <p> {comments.length}</p>

         </div>

        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
            <HeartIcon className='h-5 w-5 '/>
            <p>100</p>
        </div>

        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
        < SwitchHorizontalIcon className='h-5 w-5'/>
        </div>

        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
        <UploadIcon className='h-5 w-5'/>
        </div>
      </div>

        {/*Comment Box logic*/}

        {commentBoxVisible && (
          <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
            <input 
            value = {Input}
            onChange= { e =>setInput(e.target.value)}
            className='flex-1 rounded-lg bg-gray-100 p-2 outline-none'
            type='text' placeholder='Write a comment...'/>
            <button className='text-twitter disabled:text-gray-200'> POST </button>
          </form>
        )}



      {comments?.length > 0 && (
        <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t
        border-gray-100 p-5'>
            {comments.map ((comment) =>( 
            <div key ={comment._id} className='relative flex space-x-2'>
                <hr className='absolute left-5 top-10 h-8 border-twitter/30'/>
                <img src={comment.profileImg} 
                className ='h-7 w-7 rounded-full object-cover'
                alt =""/>
                <div>
                    <div className='flex items-center space-x-1'> 
                        <p className='mr-1 font-bold'> {comment.username}</p>   
                        <p className='hidden text-sm text-gray-500 lg:inline'>
                           
                          </p>                  
                    </div>
                     <Timeago
                     className='text-sm text-gray-500'
                     date={comment._CreateAt}/>
                </div>
                 <p>{comment.comment}</p>

                </div>
            ))}
            </div>
      )}
    </div>
  )
}

export default Tweet
