import { Detected } from '../interfaces';
import Individual from '../components/Individual';
import { Result } from '../interfaces'

const Results = ({detected} )=>{
  return(
    <div className="results-container">

      <div className="misc-contianer" style={{borderStyle: 'solid'}}>
        {detected.misc.map((item: Result, i:number )=><Individual key={i} title={item.title} description={item.why}/>)}
      </div>
    </div>
  )
}

export default Results;