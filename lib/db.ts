export {}
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alexbenko:phelps521@cluster0.nvy3b.mongodb.net/foodfinder?retryWrites=true&w=majority";
import { Detected } from '../interfaces'

const search = async(searches:[string]):Promise<any>=>{
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

export default search;