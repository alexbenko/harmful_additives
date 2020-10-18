import dictionary from '../../result'
import { NextApiRequest, NextApiResponse } from 'next';

const analyze = () =>{
  //O: object containing all detected harmful ingredients
  //I: array containing strings of each ingredient to search for
  let detected = {misc:[],colors:[],sweeteners:[],unknown:[]};

  terms.map((term:string):void=>{
    if(term in dictionary["misc"]) {
      console.log(dictionary["misc"][term])
      detected.misc.push(dictionary["misc"][term])
    } else if(term in dictionary["colors"]){
      console.log(dictionary["colors"][term]);
    } else if(term in dictionary["sweeteners"]){
      console.log(dictionary["sweeteners"][term])
    }
  })


  //return Promise.resolve({})
}


const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(typeof req.query)
    analyze(req.query['copy[]'])
    res.status(200).json(req.query['copy[]'][0])
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler