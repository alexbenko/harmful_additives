// MUI imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//other 3rd party imports
import toast from 'react-hot-toast';
import { useState,useEffect } from 'react';

//Custom imports
import UserSearch from '../components/UserSearch';
import Results from '../components/Results';
import useWindowSize from '../hooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop:'10px'
  },
  inputField: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
      backgroundColor: 'white'
    },
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '& div':{
      display:'flex',
      flexDirection:'row'
    }
  },
}));

const IndexPage = () => {
  const [search,setSearch] = useState('');
  const [searches,setSearches] = useState([]);
  const [showResults,setShowResults] = useState(false);
  const [results,setResults] = useState({results:{}});
  const [loading,setLoading] = useState(false);
  //const windowSize = useWindowSize();

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
      toast.success(`Successfully deleted ${toDelete} from search.`)
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
        body: JSON.stringify(copy)
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
    setLoading(false)
  },[showResults,results])

  const styles = useStyles();
  return(
    <Container maxWidth="lg">
      <div className={styles.root}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Paper className={styles.paper}>

              <form className={styles.inputField} noValidate autoComplete="off" onSubmit={(e)=>handleEnter(e)}>
                <input type="submit" style={{display: "none"}} />
                <TextField
                  id="filled-basic" color="secondary" value={search} label="Search For Ingredient Here" onChange={(e)=>setSearch(e.target.value)}
                />
              </form>

            </Paper>
          </Grid>

          <Grid item xs={12} zeroMinWidth>
            <Paper className={styles.paper}>
              <h3 style={{padding:'5px'}}>Current Search Terms</h3>

              <Grid container spacing={3}>
                {searches.map((term,i)=><UserSearch key={i} term={term} remove={handleDelete}/>)}
              </Grid>

              { searches.length > 0 && //only renders submit button once there are searches
                <Button  onClick={(e)=>handleSubmit(e)} variant="contained">Submit</Button>
              }
            </Paper>
          </Grid>

          <Grid item xs={12}>
              {loading &&
                <Paper className={styles.paper}>
                  <CircularProgress /> Searching ...
                </Paper>
              }

              {showResults && !loading &&
                <Paper className={styles.paper}>
                  <Results detected={results.results}/>
                </Paper>
              }

          </Grid>

        </Grid>
      </div>
    </Container>
  )
}

export default IndexPage
