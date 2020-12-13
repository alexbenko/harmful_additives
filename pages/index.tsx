import axios from 'axios';
import { useState } from 'react';
import Term from '../components/Term';
import Results from '../components/Results';
import useWindowSize from '../hooks/useWindowSize';

const IndexPage = () => {
  const [search,setSearch] = useState('');
  const [searches,setSearches] = useState([]);
  const [showResults,setShowResults] = useState(false);
  const [results,setResults] = useState({});
  const windowSize = useWindowSize();

  const handleEnter = (e:any):void =>{
    e.preventDefault();

    //little input validation
    if(search.length < 3){
      alert('Please Enter At Least 3 letters...')
      return
    } else if(search.includes("/>") || search.includes("<")){
      alert('Nice try 😡');
      setSearch('')
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

  const handleSubmit = (e:any):void=>{
    if(searches.length === 0){
      alert('Please enter at least one search...')
      return
    };

    e.preventDefault();
    let copy = [...searches];
    axios.get('/api/analyze',{params:{copy}})
    .then((response)=>{
      console.log('Response: ',response.data)
      setResults(response.data)
      setShowResults(!showResults)
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

      <div className="current-searches" style={{borderStyle: 'solid'}}>
        <h3>Current Search Terms:</h3>
        {searches.map((term,i)=><Term key={i} term={term} remove={handleDelete}/>)}
      </div>

      {showResults &&
        <div className="search_results">
          <Results detected={results}/>
        </div>
      }



      <div>

      </div>
    </div>
  )
}

export default IndexPage
