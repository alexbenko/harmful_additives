import dictionary from '../../data/result'
import { NextApiRequest, NextApiResponse } from 'next';
import { Detected } from '../../interfaces';
import { type } from 'os';

const analyze = async(terms):Promise<object> =>{
  //O: object containing all detected harmful ingredients
  //I: array containing strings of each ingredient to search for
  let detected:Detected = {misc:[],colors:[],sweeteners:[],unknown:[]};
  if(typeof terms === 'string'){
    let cleaned = terms.replace(/ /g,'').toLowerCase()
    if(cleaned in dictionary["misc"]) {
      detected.misc.push({title:terms,why: dictionary["misc"][terms]})
    } else if(cleaned in dictionary["colors"]){
      detected.colors.push({title:terms,why: dictionary["colors"][terms]})
    } else if(cleaned in dictionary["sweeteners"]){
      detected.sweeteners.push({title:terms,why: dictionary["sweeteners"][terms]})
    } else {
      detected.unknown.push(terms)
    }
    return detected
  } else {
    //this sanitzes each search term to have no white space and all lower case
    let sanitzed = await Promise.all(
      terms.map((term:string)=>{
        return term.replace(/ /g,'').toLowerCase()
      })
    );

    sanitzed.map((term:string,i):void=>{
      if(term in dictionary["misc"]) {
        detected.misc.push({title:terms[i],why: dictionary["misc"][term]})
      } else if(term in dictionary["colors"]){
        detected.colors.push({title:terms[i],why: dictionary["colors"][term]})
      } else if(term in dictionary["sweeteners"]){
        detected.sweeteners.push({title:terms[i],why: dictionary["sweeteners"][term]})
      } else {
        detected.unknown.push(term)
      }
    })

    return detected

  }

}


const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)
  try {
    const response = {
      userSearches: req.body,
      results:{}
    };
    response.results = await analyze(req.body)
    console.log(response.results)
    res.status(200).send(response)
  } catch (err) {
    console.error(err)
    res.status(400).json({ statusCode: 400, message: err.message })
  }
}

export default handler