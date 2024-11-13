import React, { useState, useEffect, Fragment } from "react";
import Persons from "./components/Person/Persons";
import { ToastContainer, toast } from 'react-toastify'
import Header from "./components/common/Header";
import Simplecontext from "./components/context/SimpleContext";
import NewPerson from "./components/Person/NewPerson";
import Radium from 'radium'
import Toplearn from "./components/HOC/Toplearn";
import Bazinga from "./components/HOC/Bazinga";

const App = (props) => {

    const [getPersons, setgetPersons] = useState([])
    const [getSinglePerson, setSinglePerson] = useState("")
    const [getShowPerson, setShowPerson] = useState(true)

    const handleShowPerson = () => {
        setShowPerson(!getShowPerson);

    };

    const handleDeletePerson = id => {
        //filter
        const persons = [...getPersons]
        const filterPersons = persons.filter(item => item.id !== id)
        setgetPersons(filterPersons)
        const personIndex = persons.findIndex(item => item.id === id)
        const person = persons[personIndex]
        toast.error(`${person.fullname}با موفقیت حذف شد`, {
            position: "top-right",
            closeButton: true,
            closeOnClick: true
        })
    };

    const handleNameChange = (event, id) => {

        const persons = getPersons
        const personIndex = persons.findIndex(item => item.id === id)
        const person = persons[personIndex]
        person.fullname = event.target.value

        const mypersons = [...persons]
        mypersons[personIndex] = person
        setgetPersons(mypersons)

    };

    const handleNewPerson = () => {
        const persons = [...getPersons]
        const person = {
            id: Math.floor(Math.random() * 1000),
            fullname: getSinglePerson
        }
        if (person.fullname !== "" && person.fullname !== " ") {
            persons.push(person)
            setgetPersons(persons)
            setSinglePerson("")
            toast.success("کاربر با موفقیت اضافه شد", {
                position: "bottom-right",
                closeButton: true,
                closeOnClick: true
            })
        }
    };

    const setPerson = event => {
        setSinglePerson(event.target.value);
    };


    let person = null;

    if (getShowPerson) {
        person = (
            <Persons />
        );
    }
    const btnstyle = {
        ':hover': { color: "red", backgroundColor: "yellow" }
    }
    useEffect(() => {

        return () => {
            console.log("show persons");

        }
    }, [getShowPerson])
    return (

        <Simplecontext.Provider value={{
            persons: getPersons,
            person: getSinglePerson,
            handleDeletePerson: handleDeletePerson,
            handleNameChange: handleNameChange,
            handleNewPerson: handleNewPerson,
            setPerson: setPerson
        }}>
        
   
                    <div className="rtl text-center">
                    <Header apptitle=" مدیریت کننده اشخاص" />
                    <NewPerson />
                    <button style={{ ':hover': { color: "red", backgroundColor: "yellow" } }}
                        onClick={handleShowPerson}
                        className={getShowPerson ? "btn btn-info" : "btn btn-warning"}
                    >نمایش اشخاص</button>

                    {person}
                    <ToastContainer />
                    </div>
             
        
        </Simplecontext.Provider>
    );
}
export default Bazinga(App,"bg-dark rtl text-center")  
// export default Radium(App)
