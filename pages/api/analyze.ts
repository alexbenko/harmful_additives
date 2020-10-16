import dictionary from '../../result'
import { NextApiRequest, NextApiResponse } from 'next';

const analyze = async(terms:Array<string>):Promise<Array<string>> =>{
  //O: object containing all detected harmful ingredients
  //I: array containing strings of each ingredient to search for

  terms.map((term)=>{

  })


  return Promise.resolve([''])
}


const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body.search)
    res.status(200).json('Success')
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler