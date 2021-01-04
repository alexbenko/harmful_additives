import { Detected } from '../interfaces';
import Individual from './Individual';
import ResultCard from './ResultCard'
import { Result } from '../interfaces'

const Results = ({detected} )=>{
  console.log('Detected: ',detected)
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

export default Results;