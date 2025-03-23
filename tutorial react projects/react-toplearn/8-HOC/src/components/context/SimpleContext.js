import {createContext} from 'react';

const Simplecontext=createContext({
   persons:[],
   person:"",
    handleDeletePerson:()=>{},
    handleNameChange:()=>{},
    handleNewPerson:()=>{},
    setPerson:()=>{}
})
export default Simplecontext