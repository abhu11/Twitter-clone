// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'
import {Tweet}  from '../../typings'
import {groq} from 'next-sanity'

const feedQuery = groq`
*[_type =="Tweet"] {
  _id,
  ...
} | order(_createAt desc)
`
type Data = {
  tweets: Tweet[]
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {

const tweets:Tweet[] = await sanityClient.fetch(feedQuery)


  res.status(200).json({ tweets})
}
