import React, { PureComponent , useEffect } from 'react'
import './Card.css'
import { Card, Button } from 'react-bootstrap';

// class CardItem extends PureComponent {
//     state = {}
    
//     constructor(props) {
//         super(props);
//         console.log('[Card.js] run constructor')
//     }
    
//       static getDerivedStateFromProps(props , state) {
//         console.log('[Card.js] run getDerivedStateFromProps')
//         return null;
//       }
    
//       componentDidMount() {
//         console.log('[Card.js] run componentDidMount')
//       }

//     eventHandler(e) {
//         console.log(this)
//     }

//     componentWillUnmount() {
//         console.log('[Card.js] run componentWillUnmount')
//     }

//     render() {
       
//     }

// }

function CardItem(props) {
    useEffect(() => {
        console.log('[Card.js] run useEffect')

    })

    useEffect(() => {
        console.log('[Card.js] run useEffect as mounting')

        return () => {
            console.log('[Card.js] run useEffect as unmounting')
        }
    },[])

    let { article , deleteArticle } = props;
    return (
        <Card>
            <Card.Header as="h4">{article.title}</Card.Header>
            <Card.Body>
                <Card.Text>{article.body}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <p>Card Footer</p>
                <Button onClick={() => deleteArticle(article.id)} className="btn-danger">delete</Button>
            
            </Card.Footer>
        </Card>
    )
}


export default CardItem;