import React from 'react';

const SimpleContext=React.createContext({
    persons:[],
    person:'',
    addPerson:()=>{} ,
    showHandle:()=>{},
    deletePerson:()=>{},
    setPerson:()=>{},
    editHandler:()=>{}
})
export default SimpleContext