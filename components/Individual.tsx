const generateSearchQuery = async (word:string):Promise<string> =>{
  let output = ''
  let term = word.split(' ');

  term.map((word)=> output = output + '+' + word)
  return Promise.resolve(output)
};

const goToSearch = async (search:string = 'agave nectar') =>{
  let query = await generateSearchQuery(search)

  window.open(`https://google.com/search?q=${query}+bad+for+you`)
};

const Individual = ({title, description})=>{
  return(
    <div>
      <h2 onClick={()=> goToSearch(title)}>{title}</h2>
      <p>{description}</p>
    </div>

  )
}

export default Individual