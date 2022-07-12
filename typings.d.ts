export interface Tweet extends TweetBody{
    _id:string
    _createAt:string
    _updateAt:string
    _rev:string
    _type:'tweet'
    blockTweet:boolean
}


export type TweetBody = {
    text:string
    username:string
    profileImg:string
    image?:string
}

export type CommentBody= {
    comment: string
     tweet: string
     username: string
     profileImg:string
}

export interface Comment extends CommentBody {
    _CreateAt:string
    _id: string
    _rev:string
    _type:string
    _updatedAt:string
    tweet: {
        _ref: string
        _type:'refernece'
    }
}