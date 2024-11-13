import React from 'react'

// function Card(props){
//     console.log(props);
//  return(
//     <div className="Card">
//     <header className="Card-header">
//  <h1>{props.title}</h1>
//     </header>
//     <section className="Card-body">
//  <p>{props.body}</p>
//     </section>
//     <footer className="Card-footer">
//         <p>card footer</p>
//     </footer>

// </div>
//  )
// }

class Card extends React.Component{
    eventHandler(e,id){
        console.log(id);
    }
    render(){
        let {title,body}=this.props
        return(
            <div className="Card">
              <header className="Card-header">
          <h1>{title}</h1>
              </header>
              <section className="Card-body">
            <p>{body}</p>
               </section>
            <footer className="Card-footer">
                <button onClick={(e)=>this.eventHandler(e,"xxxx")}>click</button>
           <p>card footer</p>
           </footer>
            
            </div>
        )
    }
}
export default Card;