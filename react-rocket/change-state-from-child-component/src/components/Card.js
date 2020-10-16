import React from 'react'
import './Card.css'
import {Button,Card} from 'react-bootstrap'
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

class CardItem extends React.Component{
    eventHandler(e,id){
        console.log("click");
    }
    render(){
        let {title,body}=this.props
  
        return(
           <Card>
          
              <Card.Header as="h4">
              {title}
              </Card.Header>
    
               <Card.Body>
               {body}
               </Card.Body>
            <footer className="card-footer">
                <Button onClick={this.eventHandler}>click</Button>
           <p>card footer</p>
           </footer>
            
           </Card>
        )
    }
}
export default CardItem;