import { Detected } from '../interfaces';
import Individual from '../components/Individual';

const Results = (detected:Detected)=>{
  return(
    <div className="results-container">

      <div className="misc-contianer">
        {detected.misc.map((item,i)=><Individual title={item.title} description={item.why}/>)}
      </div>
    </div>
  )
}

export default Results;