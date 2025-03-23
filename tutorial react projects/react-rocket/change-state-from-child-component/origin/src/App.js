import React from 'react';
import './App.css';
import CardItem from './components/Card';
import MyAlert from './components/Alert';
import { Carousel } from 'react-bootstrap';
import ErrorBoundary from './components/errors/ErrorBoundary'

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('[App.js] run constructor')
  }

  static getDerivedStateFromProps(props , state) {
    console.log('[App.js] run getDerivedStateFromProps')
    return null;
  }

  shouldComponentUpdate(props , state) {
    console.log('[App.js] run shouldComponentUpdate')

    return true;
  }

  getSnapshotBeforeUpdate(props , state) {
      console.log('[App.js] run getSnapshotBeforeUpdate')
      return null;
  }

  componentDidUpdate(props , state , snapshot) {
      console.log('[App.js] run componentDidUpdate')
  }

  componentDidMount() {
    console.log('[App.js] run componentDidMount')
    setTimeout(() => {
      this.setState((state , props) => ({
        articles : [...state.articles ,{ id : 4 , title : 'article 4' , body : 'this is article 4' , active: 1}]
      }))
    }, 3000);
  }

  state = {
    articles : [
      { id : 1 , title : 'article 1' , body : 'this is article 1' , active: 1},
      { id : 2 , title : 'article 2' , body : 'this is article 2' , active: 0},
      { id : 3 , title : 'article 3' , body : 'this is article 3' , active: 1},
    ],
    title : 'this is roocket',
    loading : false,
    btnHover : false,
    alert : {
      show : true
    }
  }


  loadMore = () => {
      this.setState({ loading : true })
      setTimeout(() => {
        let articles = [
          { id : 4 , title : 'article 4' , body : 'this is article 4' , active: 1},
          { id : 5 , title : 'article 5' , body : 'this is article 5' , active: 0},
          { id : 6 , title : 'article 6' , body : 'this is article 6' , active: 1},
        ]
  
  
        this.setState(prevState => {
          return {
            articles : [...prevState.articles , ...articles],
            loading : false
          }
        })
      }, 3000);
  }
  
  mosueEnter = (e) => {
    this.setState({
      btnHover : true
    })
  }

  mosueLeave = (e) => {
    this.setState({
      btnHover : false
    })
  }

  setShow(status) {
    this.setState(prevState => {
      return {
        alert : {
          show : status
        }
      }
    })
  }

  render() {
    console.log('[App.js] run render')
    
    let articleList = this.state.articles.map((article , index) => article.active ? <CardItem key={index} title={article.title} body={article.body} /> : null)
    let btnclasses = ['btn-more']

    if(this.state.btnHover) {
      btnclasses.push('active')
    }

    let { alert } = this.state;
    return (
      <div className="app">
        <MyAlert show={alert.show} setShow={this.setShow.bind(this)} />
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://roocket.ir/public/image/2018/9/23/flutter-1.png"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://roocket.ir/public/image/2018/6/7/pwa-1.png"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://roocket.ir/public/image/2017/6/13/cms-laravel-cover-1.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <ErrorBoundary>
          { articleList }
        </ErrorBoundary>
        { this.state.loading 
          ? <div>Loading ...</div> : null }
        <button 
          // className={`btn-more ${this.state.btnHover ? 'active' : ''}`}
          className={btnclasses.join(' ')}
          onClick={this.loadMore} 
          onMouseEnter={this.mosueEnter}
          onMouseLeave={this.mosueLeave} 

          >load more</button>
      </div>
    );
  }
}

export default App;
