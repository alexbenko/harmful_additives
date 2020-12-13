import dictionary from '../../data/result'
import { NextApiRequest, NextApiResponse } from 'next';
import { Detected } from '../../interfaces';

const analyze = async(terms):Promise<any> =>{
  //O: object containing all detected harmful ingredients
  //I: array containing strings of each ingredient to search for
  let detected:Detected = {misc:[],colors:[],sweeteners:[],unknown:[]};
  //this sanitzes each search term to have no white space and all lower case
  let sanitzed = await Promise.all(
    terms.map((term:string)=>{
      return term.replace(/ /g,'').toLowerCase()
    })
  );



  //TODO: refractor this using Promise.all
  sanitzed.map((term:string):void=>{
    if(term in dictionary["misc"]) {
      detected.misc.push({title:term,why: dictionary["misc"][term]})
    } else if(term in dictionary["colors"]){
      detected.colors.push({title:term,why: dictionary["colors"][term]})
    } else if(term in dictionary["sweeteners"]){
      detected.sweeteners.push({title:term,why: dictionary["sweeteners"][term]})
    } else {
      detected.unknown.push(term)
    }
  })


  return detected
}


const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = {
      userSearches: req.query['copy[]'],
      results:[]
    };

    let results = await analyze(req.query['copy[]'])
    response.results = results
    console.log(response)
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(400).json({ statusCode: 400, message: err.message })
  }
}

export default handler