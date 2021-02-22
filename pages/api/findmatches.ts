import { NextApiRequest, NextApiResponse } from 'next';
import search from '../../lib/db';
import { Detected } from '../interfaces'
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alexbenko:phelps521@cluster0.nvy3b.mongodb.net/foodfinder?retryWrites=true&w=majority";

async function search (searches:[string]):Promise<Detected>{
  const detected:Detected = {misc:[],colors:[],sweeteners:[],unknown:[]};
  const client = await new MongoClient.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true });

  try{
      const db = client.db("foodfinder").collection("matches");
      //const matches = await db.find( { $text: { $search: searches.join().replace(","," ")} } ).toArray();
      const matches = await Promise.all(
        searches.map(async (search)=>{
          const result = await db.find({ $text: { $search: search} }).toArray();
          if(!result[0]){
            return {categeory:'',name:search}
          } else {
            return result[0]
          }
        })
      )

      console.log(matches[0] === undefined)
      if(!matches[0] && matches.length <= 1){
        throw "no matches"
      }
      console.log(matches)
      matches.map((term,i):void=>{
        if(term?.category === "misc") {
          detected.misc.push({title:term.name,why: term.why})
        } else if(term?.category === 'colors'){
          detected.colors.push({title:term.name,why: term.why})
        } else if(term?.category === "sweeteners"){
          detected.sweeteners.push({title:term.name,why: term.why})
        } else if(!(searches[i] in matches[i])){ //if a term from the users search is not in the matches
          detected.unknown.push(term.name)
        }
      })

      return detected

  }catch(err){
    throw err;
  } finally{
    client.close()
  }
};


const handler = async(req: NextApiRequest, res: NextApiResponse) => {

  const parsed = JSON.parse(req.body);

  const response = {
    success: false,
    noMatches: false,
    userSearches: parsed,
    results:{}
  };

  try {
    const data = await search(parsed);
    response.results = data;
    response.success = true;
    res.status(200).send(response)
  } catch (err) {
    if(err === "no matches"){
      response.noMatches = true;
      response.success = true;
      response.results = {misc:[],colors:[],sweeteners:[],unknown:[]}
      res.status(200).send(response);
      return
    }
    response.success = false;
    console.error('[API ERROR]',err)
    res.status(400).json({ statusCode: 400, message: err.message })
  }
}

export default handler