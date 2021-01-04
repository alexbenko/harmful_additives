import Individual from '../components/Individual';

const ResultCard = ({ header , subtitle , results})=>{
  if(results.length === 0){
    return null
  } else {
    return(
      <div className={`${header}-card`} style={{display:'flext',flexDirection:'column'}}>
        <div className="card-header">
          <h2>{header}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="results-container">
          {results.map((result, i:number )=><Individual key={i} title={result.title} description={result.why}/>)}
        </div>
      </div>
    )
  }
}

export default ResultCard