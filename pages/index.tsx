import axios from 'axios';
import { useState } from 'react';
import Term from '../components/Term';

const generateSearchQuery = async (word:string):Promise<string> =>{
  let output = ''
  let term = word.split(' ');

  term.map((word)=> output = output + '+' + word)
  return Promise.resolve(output)
};

const goToSearch = async (search:string = 'agave nectar') =>{
  let query = await generateSearchQuery(search)

  window.open(`https://google.com/search?q=${query}+bad+for+you`)
};



const IndexPage = () => {
  const [search,setSearch] = useState('');
  const [searches,setSearches] = useState([]);
  const [results,setResults] = useState({});

  const handleEnter = (e:any):void =>{
    e.preventDefault();

    if(search.length < 3){
      alert('Please Enter At Least 3 letters...')
      return
    }

    try{
      //push curent search into searches array
      setSearches(prevArray => [...prevArray, search])
    } finally {
      //clear search so user can search a new one
      setSearch('')
    }
  };

  const handleDelete = (toDelete:string):void=>{
    //copy state array as i cant mutate directly
    let copiedState = [...searches];
    let idx = copiedState.indexOf(toDelete);

    //remove it from array
    try{
      copiedState.splice(idx,1)
    } finally{
      setSearches(copiedState)
    }
  };

  const handleSubmit = (e:any)=>{
    if(searches.length === 0){
      alert('Please enter at least one search...')
      return
    };

    e.preventDefault();
    let copy = [...searches];
    axios.get('/api/analyze',{params:{copy}})
    .then((response)=>{
      console.log(response.data)
    })
    .catch((err)=>{
      console.error(err)
    })

  }

  return(
    <div className="index">
      <div className="welcome-paragraph">
        <p>

        </p>
      </div>

      <div className="forms">
        <p>Type the names of ingredients you want to search and hit Enter to add them</p>
        <form onSubmit={(e)=>handleEnter(e)}>
          <input type="submit" style={{display: "none"}} />
          <input type="text" value={search} style={{ padding: '10px'}} onChange={(e)=>setSearch(e.target.value)}/>
        </form>

        <button onClick={(e)=>handleSubmit(e)}>Submit</button>

      </div>

      <div className="current-searches" >
        <h3>Current Search Terms:</h3>
        {searches.map((term,i)=><Term key={i} term={term} remove={handleDelete}/>)}
      </div>

    </div>
  )
}

export default IndexPage
