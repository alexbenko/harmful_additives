import ResultTable from './ResultTable';
import { Detected } from '../interfaces';

const Results = ({ detected })=>{
  if(!(detected.sweeteners.length > 0) && !(detected.colors.length > 0) && !(detected.misc.length > 0)){
    return (
      <div>
          No Matches
      </div>
    )
  } else {

    return(
      <div>

          <ResultTable
            header={'Artificial Sweeteners'}
            results={detected.sweeteners}
          />

          <ResultTable
            header={'Artificial Coloring'}
            results={detected.colors}
          />

          <ResultTable
            header={'Miscellaneous Additives'}
            results={detected.misc}
          />
        </div>


    )
  }
}

export default Results;