const generateSearchQuery = async (word:string):Promise<string> =>{
  let output = ''
  let term = word.split(' ');

  term.map((word)=> output = output + '+' + word)
  return output
};

const goToSearch = async (search:string = 'agave nectar') =>{
  let query = await generateSearchQuery(search)

  window.open(`https://google.com/search?q=${query}`)
};

const Individual = ({title, description})=>{
  return(
    <div>
      <h2 onClick={()=> goToSearch(title)} style={{cursor:'pointer'}}>{title}</h2>
      <p>{description}</p>
    </div>

  )
}

export default Individual