import React from 'react'

function Card({ title , body }) {
    const eventhandler=()=>{
        console.log(title);
        
    }
    return (
        <div className="card">
            <header className="card-header">
                <h2>{title}</h2>
            </header>
            <section className="card-body">
                <p>{body}</p>
                <button onClick={eventhandler}>click</button>
            </section>
            <footer>
                <p>Card Footer</p>
            </footer>
        </div>
    )
}

export default Card;