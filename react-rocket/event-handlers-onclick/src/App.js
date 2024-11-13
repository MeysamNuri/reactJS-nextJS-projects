import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';

// function App() {
//   return (
//   <div className="app">
//     <Card title="Article 1" body="body article 1" />
//     <Card title="Article 2" body="body article 2" />
//     <Card  title="Article 3" body="body article 3"/>
//   </div>
//   );
// }

class App extends React.Component{
  state={
    articls:[
      {id:"1",title:"Article 1 title",body:"Article 1 body"},
      {id:"2",title:"Article 2 title",body:"Article 2 body"},
      {id:"3",title:"Article 3 title",body:"Article 3 body"},
    ]
  }
constructor(){
  super()
setInterval(() => {
this.setState({
  articls:[
    {id:"4",title:"Article 4 title",body:"Article 4 body"},
    {id:"5",title:"Article 5 title",body:"Article 5 body"},
    {id:"6",title:"Article 6 title",body:"Article 6 body"},
  ]
})
console.log(this.state);
}, 3000);
}
  render(){
 
      return (
  <div className="app">
    <Card title={this.state.articls[0].title} body={this.state.articls[0].body} />
    <Card title={this.state.articls[1].title} body={this.state.articls[1].body} />
    <Card  title={this.state.articls[2].title} body={this.state.articls[2].body}/>
  </div>
  );
  }
}
export default App;
