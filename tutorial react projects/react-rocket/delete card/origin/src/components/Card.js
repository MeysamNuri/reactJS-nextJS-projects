import React, { PureComponent } from 'react'
import './Card.css'
import { Card, Button } from 'react-bootstrap';

class CardItem extends PureComponent {
    state = {}
    
    constructor(props) {
        super(props);
        console.log('[Card.js] run constructor')
    }
    
      static getDerivedStateFromProps(props , state) {
        console.log('[Card.js] run getDerivedStateFromProps')
        return null;
      }
    
      componentDidMount() {
        console.log('[Card.js] run componentDidMount')
      }

    eventHandler(e) {
        console.log(this)
    }

    componentWillUnmount() {
        console.log('[Card.js] run componentWillUnmount')
    }

    render() {
        console.log('[Card.js] run render')

        let { id , title , body , deleteArticle } = this.props;
        return (
            <Card>
                <Card.Header as="h4">{title}</Card.Header>
                <Card.Body>
                    <Card.Text>{body}</Card.Text>
                    <Button onClick={this.eventHandler.bind(this, 'xxxxx')}>Click</Button>
                </Card.Body>
                <Card.Footer>
                    <p>Card Footer</p>
                    <Button onClick={() => deleteArticle(id)} className="btn-danger">delete</Button>
                
                </Card.Footer>
            </Card>
        )
    }

}


export default CardItem;