import React, { useState } from 'react';
import './App.css';
import Card from './Card';

function App() {
  const [text,setText]=useState({
    articles:[
      {id:'1',title:"article 1",body:"this is article 1"},
      {id:'2',title:"article 2",body:"this is article 2"},
      {id:'3',title:"article 3",body:"this is article 3"},
    ]
  })

//  setTimeout(() => {
//   setText({
//     articles:[
//       {id:'4',title:"article 4",body:"this is article 4"},
//       {id:'5',title:"article 5",body:"this is article 5"},
//       {id:'6',title:"article 6",body:"this is article 6"},
//     ]
//   })
//  }, 3000);

 const loadMore=()=>{
   let myarticles=
   [
      {id:'4',title:"article 4",body:"this is article 4"},
      {id:'5',title:"article 5",body:"this is article 5"},
      {id:'6',title:"article 6",body:"this is article 6"},
    ]

  //  setText({
  //    articles: [...text.articles, ...myarticles]
  //  })
  setText(prevstate=>{
    return {
      articles:[...prevstate.articles,...myarticles]
    }
  })
 }
 let articles=  text.articles.map(item=> <Card title={item.title} body={item.body} key={item.id} />)

  return (
    <div className="app">
{
  articles
}
<button onClick={loadMore}>Load more</button>
    </div>

  );
}

export default App;
