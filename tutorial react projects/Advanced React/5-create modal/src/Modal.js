import React, {  useEffect, useRef } from 'react';
import ReactDom from 'react-dom'
const Modal = ({children,open,onclose}) => {
const generate=()=>{
    const divBlur=document.createElement("div")
    divBlur.style="display:flex;"+
    "align-items:center;"+
    "justify-content:center;"+
    "position:absolute;"+
    "width:100%;"+
    "height:100vh;"+
    "backdrop-filter:blur(2px)"
    divBlur.onclick=onclose
    const divCont=document.createElement("div")
    divCont.style="border-radius:20px;"+
    "padding: 20px;"+
    "background-color: green;"+
    "color:white;"+
    "width:600px"
    

    divBlur.appendChild(divCont)
    return divBlur
}
const ModalBar=useRef(generate())
const ModalRoot=document.getElementById("modal_root")

useEffect(()=>{
    if(open){
        ModalRoot.appendChild(ModalBar.current)
    
    }
    else{
        if(ModalRoot.children.length>0)
        ModalRoot.removeChild(ModalBar.current)
    }
   

    return ()=>{
        if(ModalRoot.children.length>0)
        ModalRoot.removeChild(ModalBar.current)
       
    }
},[open])
   
    return   ReactDom.createPortal(children,ModalBar.current.getElementsByTagName("div")[0]);
}
 
export default Modal;