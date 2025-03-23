import React,{useState} from 'react'

import {Alert,Button} from 'react-bootstrap'
// function MyAlert(props){
//     console.log(props);
//    let {show,myshow}=props
//  return(
// //     <div className="Card">
// //     <header className="Card-header">
// //  <h1>{props.title}</h1>
// //     </header>
// //     <section className="Card-body">
// //  <p>{props.body}</p>
// //     </section>
// //     <footer className="Card-footer">
// //         <p>card footer</p>
// //     </footer>

// // </div>

// <>
// <Alert show={show} variant="success">
//   <Alert.Heading>How's it going?!</Alert.Heading>
//   <p>
//     Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
//     lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
//     fermentum.
//   </p>
//   <hr />
//   <div className="d-flex justify-content-end">
//     <Button onClick={() => myshow(false)} variant="outline-success">
//       Close me y'all!
//     </Button>
//   </div>
// </Alert>

// {!show && <Button onClick={() => myshow(true)}>Show Alert</Button>}
// </>
//  )
// }

class MyAlert extends React.Component{
state={
}

    render(props){
 
        let {show,setShow}=this.props
  
        return(
            <>
            <Alert show={show} variant="success">
              <Alert.Heading>How's it going?!</Alert.Heading>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                fermentum.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() =>setShow(false)} variant="outline-success">
                  Close me y'all!
                </Button>
              </div>
            </Alert>
      
            {!show && <Button onClick={() =>setShow(true)}>Show Alert</Button>}
          </>
        )
    }
}
export default MyAlert;