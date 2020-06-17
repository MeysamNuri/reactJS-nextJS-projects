import React from 'react'
import './card.css'
function Card({ title , body,deleteCard,id }) {
    const eventhandler=()=>{
        console.log(title);
        
    }
    // throw Error('somthin went wrong')
    return (
        <div className="card">
            <header className="card-header">
                <h2>{title}</h2>
            </header>
            <section className="card-body">
                <p>{body}</p>
                <button onClick={eventhandler} className="btn btn-info">click</button> <br />  <br />
                <button onClick={()=>deleteCard(id)} className="btn btn-danger">delete</button>
            </section>
            <footer className="card-footer">
                <p>Card Footer</p>
            </footer>
        </div>
    )
}

export default Card;