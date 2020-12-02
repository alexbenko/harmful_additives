import dictionary from '../../data/result'
import { NextApiRequest, NextApiResponse } from 'next';
import { Detected } from '../../interfaces';

const analyze = async(terms) =>{
  //O: object containing all detected harmful ingredients
  //I: array containing strings of each ingredient to search for
  let detected:Detected = {misc:[],colors:[],sweeteners:[],unknown:[]};

  //TODO: refractor this using Promise.all
  terms.map((term:string):void=>{
    if(term in dictionary["misc"]) {
      console.log(dictionary["misc"][term])
      detected.misc.push({title:term,why: dictionary["misc"][term]})
    } else if(term in dictionary["colors"]){
      console.log(dictionary["colors"][term])
      detected.colors.push({title:term,why: dictionary["colors"][term]})
    } else if(term in dictionary["sweeteners"]){
      console.log(dictionary["sweeteners"][term])
      detected.sweeteners.push({title:term,why: dictionary["sweeteners"][term]})
    } else {
      detected.unknown.push(term)
    }
  })


  return detected
}


const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(typeof req.query['copy[]'])
    let results = await analyze(req.query['copy[]'])
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler