import React, { useState } from 'react';
import MapPersons from './Components/MapPersons';
import { ToastContainer, toast } from 'react-toastify'
import Header from './Components/Header';
import SimpleContext from './context/SimpleContext'
import NewPerson from './Components/NewPerson';
import Radium from 'radium'
import Toplearn from './HOC/Toplearn';
import Baziga from './HOC/Rootcomponent';

const App = (props) => {
    const [getPerson,setGetPerson]=useState([])
    const [singlePerson,setSinglePerson]=useState("")
    const [show,setShow]=useState(true)

    let showHandle = (e) => {
        setShow(!show)
    }
    let addPerson = () => {
        const persons = [...getPerson]
        const person = {
            id: Math.floor(Math.random() * 1000), fullname: singlePerson

        }
        if (person.fullname !== "" && person.fullname.length > 1) {
            persons.push(person)
            setGetPerson(persons)
            setSinglePerson("")
            toast.success("کاربر اضافه شد با موفقیت", {
                position: "top-right",
                closeButton: true
            })
        }
        console.log(persons);
    }
    let setPerson = (e) => {
       setSinglePerson(e.target.value)
    }
    let deletePerson = (personId) => {
        // this.setState(prevstate => {
        //     return {
        //         ...prevstate.persons,
        //         persons: prevstate.persons.filter(item => item.id !== personId)
        //     }
        // })
        const persons = [...getPerson]
        const filterPerson = persons.filter(item => item.id !== personId)

        const personIndex = persons.findIndex(item => item.id === personId)
        const newPerson = persons[personIndex]
        setGetPerson( filterPerson)
        toast.error(`${newPerson.fullname} با موفقیت حذف شد`, {
            position: "top-right",
            closeButton: true
        })
    }
    let editHandler = (e, id) => {
        const persons = [...getPerson]
        const personIndex = persons.findIndex(item => item.id === id)
        const newPerson = persons[personIndex]
        newPerson.fullname = e.target.value
        //    const myperson=[...persons]
        //    myperson[personIndex]=newPerson
        setGetPerson( persons )

    }
    return (
        <SimpleContext.Provider value={{
            persons: getPerson,
            person:singlePerson,
            addPerson,
            editHandler,
            deletePerson,
            showHandle,
            setPerson
        }}>
          
<div className="rtl text-center">

<div>
    <h2>{props.title}</h2>
        
                <Header />
                <NewPerson />
                <button onClick={showHandle} className="btn btn-info" style={{ marginTop: "10px",':hover':{color:"red",backgroundColor:"green"} }}>نمایش اشخاص</button>

                {
                    !show ?
                        <p>شخصی وجود ندارد</p>
                        :
                        <>

                            <MapPersons  />

                        </>
                }
                <ToastContainer />
                </div>
                </div>
           
        </SimpleContext.Provider>


    );
}

export default App