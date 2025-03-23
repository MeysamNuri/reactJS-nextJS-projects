import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Errors from './components/errors/ErrorBoundary'
import './App.css';
import MyAlert from './components/Alert'
import CardItem from './components/Card';
// function App() {
//   const [stateArticles,setArticles]=useState({
//     articls:[
//       {id:"1",title:"Article 1 title",body:"Article 1 body"},
//       {id:"2",title:"Article 2 title",body:"Article 2 body"},
//       {id:"3",title:"Article 3 title",body:"Article 3 body"},

//     ],

//   })
//   const [stateTitle,setTitle]=useState({
//     title:"this is new article"
//   })
//   const [show,setShow]=useState(true)
//   const [stateLoading,setMyLoading]=useState(false)
// const [stateBtn,setBtn]=useState(false)
//   let mouseEnter=(e)=>{
//     setBtn(true)
//   }
//   let mouseLeave=(e)=>{
//     setBtn(false)
//   }
//   // let togglebtn=(e)=>{
//   //   setBtn(!stateBtn)
//   //   console.log("mouse");
//   // }
// //   setTimeout(() => {
// //     setArticles({
// //         articls:[
// //     {id:"4",title:"Article 4 title",body:"Article 4 body"},
// //     {id:"5",title:"Article 5 title",body:"Article 5 body"},
// //     {id:"6",title:"Article 6 title",body:"Article 6 body"},
// // ]
// //     })
// //   }, 2000);
//    let articleList=  stateArticles.articls.map((item,index) =><Errors> <CardItem key={index} title={item.title} body={item.body} /></Errors>)
// let loadmore=()=>{
//  setMyLoading(true)
// setTimeout(() => {
//   let myArticles=[
//     {id:"4",title:"Article 4 title",body:"Article 4 body"},
//     {id:"5",title:"Article 5 title",body:"Article 5 body"},
//     {id:"6",title:"Article 6 title",body:"Article 6 body"},
//   ]

//   // setArticles({
//   //   articls:[...stateArticles.articls,...myArticles]
//   // })
//   setArticles(prevstate=>{
//     return{
//       articls:[...prevstate.articls,...myArticles],


//     }
//   })
//   setMyLoading(false)
// }, 2000);

// }

// let btnclasses=["btnStyle"]
// if(stateBtn){
//   btnclasses.push("active")
// }
// console.log(stateArticles)
// console.log(stateTitle)
// let clickbutton=()=>{
// setShow(!show)
// }
//   return (

//   <div className="app">
// <MyAlert show={show} myshow={clickbutton} />
// <Carousel>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src="https://roocket.ir/public/images/2020/9/25/php.jpg"
//       alt="First slide"
//     />
//     <Carousel.Caption>
//       <h3>First slide label</h3>
//       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//     </Carousel.Caption>
//   </Carousel.Item>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src="https://roocket.ir/public/images/2020/6/17/angular.png"
//       alt="Third slide"
//     />

//     <Carousel.Caption>
//       <h3>Second slide label</h3>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     </Carousel.Caption>
//   </Carousel.Item>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src="https://roocket.ir/public/images/2020/9/10/laravel-thum.jpg"
//       alt="Third slide"
//     />

//     <Carousel.Caption>
//       <h3>Third slide label</h3>
//       <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//     </Carousel.Caption>
//   </Carousel.Item>
// </Carousel>
// {
//   articleList
// }
// {
//   stateLoading?<p style={{fontSize:"18px",color:"green"}}>loading...</p>:null
// }
// <button className={btnclasses.join(' ')} onClick={loadmore}
// onMouseEnter={mouseEnter}
// onMouseLeave={mouseLeave}
// >load more</button>
//   </div>
//   );
// }

class App extends React.Component {
  state = {
    articls: [
      { id: "1", title: "Article 1 title", body: "Article 1 body" },
      { id: "2", title: "Article 2 title", body: "Article 2 body" },
      { id: "3", title: "Article 3 title", body: "Article 3 body" },
    ],
    btnHover: false,
    alert:{
      show:true
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log('app getderived...')
    return null;

  }
  componentDidMount() {
    console.log('app did mount')
    setTimeout(() => {
      this.setState(() => ({

        articls: [...this.state.articls, { id: "9", title: "Article 9 title", body: "Article 9 body" },]

      }))
    }, 3000);
  }
  loadmore = () => {
    let myArticles = [
      { id: "4", title: "Article 4 title", body: "Article 4 body" },
      { id: "5", title: "Article 5 title", body: "Article 5 body" },
      { id: "6", title: "Article 6 title", body: "Article 6 body" },
    ]


    this.setState(prevstate => {
      return {
        articls: [...prevstate.articls, ...myArticles]
      }
    })
  }

  togglebtn = (e) => {
    this.setState(prevstate => {
      return {
        btnHover: !prevstate.btnHover
      }
    })
    console.log("mouse");
  }

  setShow=(status)=>{
    console.log(status,this)
    this.setState(prevstate=>({
   
        alert:{
          ...prevstate.alert,
          show:status
    }
    }))
  }
  render() {
    console.log('app render par');
    let articleList = this.state.articls.map((item, index) => <CardItem key={index} title={item.title} body={item.body} />)
    const btnStyle = {
      backgroundColor: "grey",
      color: "white",
      borderRadius: "10px",
      padding: "10px"
    }
    if (this.state.btnHover) {
      btnStyle.backgroundColor = "red"
    }
  
    let {show}=this.state.alert
    return (
      <div className="app">
        <MyAlert show={show} setShow={this.setShow} />
        {
          articleList
        }
        <button onClick={this.loadmore}
          style={btnStyle}
          onMouseEnter={this.togglebtn}
          onMouseLeave={this.togglebtn}
        >load more</button>
      </div>
    );
  }
}
export default App;
