// MUI imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
//other 3rd party imports
import toast from 'react-hot-toast';
import React, { useState,useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import Image from 'next/image';

//Custom imports
import UserSearch from '../components/UserSearch';
import Results from '../components/Results';
import useWindowSize from '../hooks/useWindowSize';
import ProgressBar from '../components/ProgressBar';

interface StyleProps{
  width:number
}

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
    //'& div':{
      //display:'flex',
      //flexDirection:'row'
    //}
  },
  centeringContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paperInputRoot: (props:StyleProps) =>({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: props.width < 1025 ? null : 'calc(45%)',
  }),
  paperInputField:{
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  paperInputIcon:{
    padding: 10,
  }
}));


const IndexPage = () => {
  const [search,setSearch] = useState('');
  const [searches,setSearches] = useState([]);
  const [showResults,setShowResults] = useState(false);
  const [results,setResults] = useState({results:{}});
  const [loading,setLoading] = useState(false);

  const [manual,setManual] = useState(true);
  const [uploads,setUploads] = useState([]);
  const [base64Image,setBase64Image] = useState<string | ArrayBuffer>('');
  const [progress,setProgress] = useState(0);
  const [currentAction,setCurrentAction] = useState<null | string>(null)
  const [text,setText] = useState({text:'',confidence:null});

  useEffect(()=>{
    //setSearches([]);
    setBase64Image('');
    setProgress(0);
    setText({text:'',confidence:null});
    setCurrentAction(null);
  },[manual])

  const worker = createWorker({
    logger: (job)=>{
      console.log(job)
      if(job.status === "recognizing text"){
        if(currentAction !== "recognizing text") setCurrentAction("Recognizing Text");
        setProgress(job.progress * 100) //progressbar takes values from 0-100
      } else {
        setCurrentAction(job.status.split(' ')[0])
      }
    }
  });


  const handleAdd = (e:React.FormEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>):void =>{
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

  const convertImageToBase64 = async(e)=>{
    if(progress !== 0) setProgress(0);

    let file = e.target.files[0]
    if(file){
      let reader = new FileReader();
      reader.onloadend = ()=> {
        toast.success('Image Successfully encoded.')
        console.log('For you curious people who want to know if I actually encode your image. Here it is: \n', reader.result)
        setBase64Image(reader.result);
      }

      reader.readAsDataURL(file);
    }
  }

  /*const handleImageUpload = async(e)=>{
    if(progress !== 0) setProgress(0);

    if(e.target.files[0]){
      for (let key in e.target.files) {
        if (!e.target.files.hasOwnProperty(key)) continue;
        let upload = e.target.files[key]
        console.log(upload)
        setUploads(prevArray => [...prevArray, URL.createObjectURL(upload)])
      }
    } else {
      setUploads([]);
    }
  };
*/
  const read = async()=>{
    console.log('Reading Image ...');
    if(progress !== 0) setProgress(0);

    try{
      toast('Loading Image...')
      let start = new Date().getTime();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data } = await worker.recognize(base64Image);
      console.log('Confidence: ',data.confidence)
      if(data.confidence < 80){
        toast(`Warning: I am only ${data.confidence}% confident that I read your image accurately.`)
      }
      await worker.terminate();
      setText({text:data.text,confidence:data.confidence})
      setSearches(data.text.split(", "))
      let end = new Date().getTime();
      console.log(`Took ${(end - start)/1000}seconds`);
    }catch(err){
      console.log('Error Reading Image: ',err)
      toast.error("Error trying to read image. Refresh the page and try again please.")
    }

    //setSearches()
  }

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

  const getData = async (e)=>{
    e.preventDefault()
    setLoading(true);
    let copy = [...searches];

    let results = await fetch('/api/findmatches',{
      method: 'PUT',
      body: JSON.stringify(copy)
    })
    let parsed = await results.json()
    console.log(parsed)
    if(parsed.success){
      setResults(parsed)
      setShowResults(true)
      if(parsed.noMatches){
        toast("No Matches")
      }
    }else {
      throw -1
    }
  };

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>):Promise<void>=>{
    e.preventDefault();
    if(searches.length === 0){
      toast('Please enter at least one search...')
      return
    };

    toast.promise(
      getData(e),
      {
        loading: 'Loading...',
        success: `Search Was A Success`,
        error: `Request Failed Check your connection and try again.`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          icon: '🍃'
        },
        error:{
          icon: '❌'
        }
      }
    );
  }

  useEffect(()=>{
    setLoading(false)
  },[showResults,results])

  const { width } = useWindowSize();
  const styles = useStyles({ width });

  return(
    <Container maxWidth="lg">
      <div className={styles.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} >
            <div className={styles.centeringContainer}>
              <Typography>Manual Entry</Typography>
              <Switch
                checked={!manual}
                onChange={()=>setManual(!manual)}
                name="Manual"
                inputProps={{ 'aria-label': 'manual entry' }}
              />
              <Typography>Upload Image</Typography>
            </div>
            <div className={width > 1025 ? styles.centeringContainer : null}>
              { manual ?
                <Paper component="form" onSubmit={(e)=>handleAdd(e)} className={styles.paperInputRoot}>
                  <input type="submit" style={{display: "none"}} />
                  <InputBase
                    className={styles.paperInputField}
                    placeholder="Add For Ingredient Here"
                    inputProps={{ 'aria-label': 'search for harmful ingredient' }}
                    autoComplete="off"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  <IconButton onClick={(e)=> handleAdd(e)} type="submit" className={styles.paperInputIcon} aria-label="search">
                    <AddIcon />
                  </IconButton>
                </Paper> :

                <div>
                    <label className="fileUploaderContainer">
                      Click here to upload Image
                      <input type="file" id="fileUploader" onChange={(e)=>convertImageToBase64(e)}/>
                    </label>

                    <Button variant="contained" onClick={()=>read()}>Submit</Button>
                    <ProgressBar value={progress} action={currentAction}/>
                    {text.text}
                    <br></br>
                    {text.confidence}
                </div>

              }
            </div>


          </Grid>

          <Grid item xs={12} zeroMinWidth>
            { searches.length > 0 && <Paper className={styles.paper}>
              <h3 style={{padding:'5px'}}>Current Search Terms</h3>

              <Grid container spacing={3}>
                {searches.map((term,i)=><UserSearch key={i} term={term} remove={handleDelete}/>)}
              </Grid>
              <br></br>
              { searches.length > 0 && //only renders submit button once there are searches
                <div className={styles.centeringContainer}>
                  <Button onClick={(e)=>handleSubmit(e)} variant="contained">
                    Search
                  </Button>
                </div>
              }
            </Paper>}
          </Grid>

          <Grid item xs={12} zeroMinWidth>

            {showResults && !loading &&
                <Results detected={results.results}/>
            }
          </Grid>

        </Grid>
      </div>
    </Container>
  )
}

export default IndexPage
