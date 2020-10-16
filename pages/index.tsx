const generateSearchQuery = async (word:string):Promise<string> =>{
  let output = ''
  let term = word.split(' ');

  term.map((word)=> output = output + '+' + word)
  console.log(term)
  return Promise.resolve(output)
};

const goToSearch = async () =>{
  let query = await generateSearchQuery('agave nectar')

  window.open(`https://google.com/search?q=${query}+bad+for+you`)
}

const IndexPage = () => {
  return(
    <div className="index">
      <h1>Hello 👋</h1>
      <button onClick={()=>goToSearch()}></button>
    </div>
  )
}

export default IndexPage
