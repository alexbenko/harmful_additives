const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alexbenko:phelps521@cluster0.nvy3b.mongodb.net/foodfinder?retryWrites=true&w=majority";
import { Detected } from '../interfaces'

const search = async(searches:[string]):Promise<any>=>{
  const detected:Detected = {misc:[],colors:[],sweeteners:[],unknown:[]};
  const client = await new MongoClient.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true });

  try{
      const db = client.db("foodfinder").collection("matches");
      const matches = await db.find( { $text: { $search: searches.join().replace(","," ")} } ).toArray();

      matches.map((term,i):void=>{
        if(term.category === "misc") {
          detected.misc.push({title:term.name,why: term.why})
        } else if(term === "colors"){
          detected.colors.push({title:term.name,why: term.why})
        } else if(term.category === "sweeteners"){
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