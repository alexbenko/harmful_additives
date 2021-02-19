import ResultCard from './ResultCard';
import { Detected } from '../interfaces';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Results = ({ detected })=>{
  console.log(detected.sweeteners)
  if(!(detected.sweeteners.length > 0) && !(detected.colors.length > 0) && !(detected.misc.length > 0)){
    return (
      <div>
          No Matches
      </div>
    )
  } else {
    return(
      <div className="results-container">
        <ResultCard
          header={'Artificial Sweeteners'}
          subtitle={''}
          results={detected.sweeteners}
        />

        <ResultCard
          header={'Artificial Coloring'}
          subtitle={''}
          results={detected.colors}
        />

        <ResultCard
          header={'Miscellaneous'}
          subtitle={'A list of other harmful ingredients found in your food'}
          results={detected.misc}
        />
      </div>
    )
  }
}

export default Results;