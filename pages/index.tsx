import CircularProgress from '@material-ui/core/CircularProgress';
import toast from 'react-hot-toast';
import { useState,useEffect } from 'react';
import Term from '../components/Term';
import Results from '../components/Results';
import useWindowSize from '../hooks/useWindowSize';


const IndexPage = () => {
  const [search,setSearch] = useState('');
  const [searches,setSearches] = useState([]);
  const [showResults,setShowResults] = useState(false);
  const [results,setResults] = useState({results:''});
  const [loading,setLoading] = useState(false);
  const windowSize = useWindowSize();

  const handleEnter = (e:any):void =>{
    e.preventDefault();

    //little input validation
    if(search.length < 3){
      toast.error('Please Enter At Least 3 letters...')
      return
    } else if(search.includes("/>") || search.includes("<")){
      toast.error('Nice try 😡');
      setSearch('')
      return
    }

    try{
      //push curent search into searches array
      setSearches(prevArray => [...prevArray, search])
      toast.success('Added Successfully !')
    } catch(err){
      console.error('Error Adding Search: ',err)
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
      toast.success(`Successfully Deleted: ${toDelete} from search.`)
    } catch(err) {
      toast.error('Error Deleting Search, Please Try Again.')
      console.log('Error Tyring to Delete: ',err)
    } finally {
      setSearches(copiedState)
    }
  };

  const handleSubmit = async (e:any):Promise<void>=>{
    if(searches.length === 0){
      toast('Please enter at least one search...')
      return
    };

    e.preventDefault();
    setLoading(true);
    let copy = [...searches];

    try{
      let results = await fetch('/api/analyze',{
        method: 'PUT',
        body: copy
      })
      let parsed = await results.json()
      console.log(parsed)
      setResults(parsed)
      setShowResults(true)
    }catch(err){
      toast.error('Netowork Error,Please Check your connection or refresh the page.')
      console.error(err)
    }

  };

  useEffect(()=>{
    console.log("Results Got updated, no longer loading...")
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[showResults,results])


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

      {loading &&

        <CircularProgress />
      }

      {showResults && !loading &&
        <div className="search_results">
          <Results detected={results.results}/>
        </div>
      }


    </div>
  )
}

export default IndexPage
