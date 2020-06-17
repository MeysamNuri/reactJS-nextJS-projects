import React, { useState } from 'react';
import './App.css';
import Card from './component/Card';
import ErrorBoundary from './errors/ErrorBoundary'
import AlertDismissible from './component/Alert'
function App() {
  const [show, setShow] = useState(true);
  const [myload, setmyload] = useState(false)
  const [mystyle,setMystyle]=useState(false)
  const [text, setText] = useState({
    articles: [
      { id: '1', title: "article 1", body: "this is article 1",active:1 },
      { id: '2', title: "article 2", body: "this is article 2",active:0 },
      { id: '3', title: "article 3", body: "this is article 3",active:1 },
    ]
  })
//  const handleMouseEnter=(e)=>{
// setMystyle(true)

//  }
//  const handleMouseLeave=(e)=>{
// setMystyle(false)

//  }
 const toggleMouse=(e)=>{
  setMystyle(!mystyle)
 }
  //  setTimeout(() => {
  //   setText({
  //     articles:[
  //       {id:'4',title:"article 4",body:"this is article 4"},
  //       {id:'5',title:"article 5",body:"this is article 5"},
  //       {id:'6',title:"article 6",body:"this is article 6"},
  //     ]
  //   })
  //  }, 3000);

  const loadMore = () => {
    setmyload(true)
    let articles =
      [
        { id: '4', title: "article 4", body: "this is article 4",active:1 },
        { id: '5', title: "article 5", body: "this is article 5",active:0 },
        { id: '6', title: "article 6", body: "this is article 6",active:1 },
      ]

    //  setText({
    //    articles: [...text.articles, ...articles]
    //  })
    setTimeout(() => {
      setText(prevstate => {
        return {

          articles: [...prevstate.articles, ...articles],
        }
      })
      setmyload(false)
    }, 3000);
  }
  const deleteCard=(articleId)=>{
    // setText({
    //   articles: text.articles.filter(item=>item.id !== articleId )
    // })
    setText(prevstate=>{
      return{
        articles: prevstate.articles.filter(item=>item.id !== articleId)
      }
    })
  }
  let articles = text.articles.map(item =>item.active? <Card deleteCard={deleteCard} id={item.id} title={item.title} body={item.body} key={item.id} /> :null)

let btnclasses=['btn-style']
if(mystyle){
  btnclasses.push("active")
}


  return (
    <div className="app">
      <AlertDismissible show={show} setShow={setShow} />
      <div >
        <div >
        <ErrorBoundary>
          {articles}
          </ErrorBoundary>
       {
        myload ? <div>Loading ...</div> : null

      }
         
        </div>
      </div>
    
     

      <button onClick={loadMore}
      onMouseEnter={toggleMouse}
      onMouseLeave={toggleMouse}
      className={btnclasses.join(" ")}
      // className={`btn-style ${mystyle?"active":""}` }
      >Load more</button>
    </div>

  );
}

export default App;
