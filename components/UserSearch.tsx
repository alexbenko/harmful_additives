import React from 'react';

type TermCon = {
  remove: Function
  term: string
}

const Term = ({remove,term}:TermCon) =>{
  return(
    <div className={`${term}-container`} style={{display:'flex',flexDirection:'row'}}>
      <p>{term}</p>
      <span style={{cursor:'pointer'}} onClick={()=>remove(term)}>&#10006;</span>
    </div>
  )
};

export default Term