import axios from 'axios';
import { useState } from 'react'
const generateSearchQuery = async (word:string):Promise<string> =>{
  let output = ''
  let term = word.split(' ');

  term.map((word)=> output = output + '+' + word)
  return Promise.resolve(output)
};

const goToSearch = async () =>{
  let query = await generateSearchQuery('agave nectar')

  window.open(`https://google.com/search?q=${query}+bad+for+you`)
};


const IndexPage = () => {
  const [search,setSearch] = useState('');
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('/api/analyze',{search:search})

  }

  return(
    <div className="index">
      <div className="welcome-paragraph">
        <p>

        </p>

      </div>

      <div className="forms">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="submit" style={{display: "none"}} />
          <input type="text" value={search} style={{ padding: '10px'}} onChange={(e)=>setSearch(e.target.value)}/>
        </form>

      </div>
      <h1>Hello 👋</h1>

    </div>
  )
}

export default IndexPage
