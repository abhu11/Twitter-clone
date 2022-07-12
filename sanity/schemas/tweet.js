export default {
  name: 'Tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in the tweet',
      type: 'string',
    },
    {
        name:'blockTweet',
        title:'Block Tweet',
        description:'ADMIN Control: Toggle if Tweet is deemed inappropriate',
        type:'boolean'
    },
    {
      name: 'username',
      title: 'username',
      type: 'string',
    },
    {
      name: 'profileImag',
      title: 'profile Image',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Tweet image',
      type: 'string',
    },
  ],
}
    
 
