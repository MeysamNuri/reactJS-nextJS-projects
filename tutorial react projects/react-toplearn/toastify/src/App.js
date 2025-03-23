import React, { Component } from 'react';
import MapPersons from './Components/MapPersons';
import {Badge} from 'react-bootstrap'
import {ToastContainer,toast} from 'react-toastify'
class App extends Component {
    state = {
        persons: [

        ],
        person: "",
        show: true

    }
    showHandle = (e) => {
        this.setState(prevstate => {
            return {
                ...prevstate.show,
                show: !this.state.show
            }
        })
    }
    addPerson = () => {
        const persons = [...this.state.persons]
        const person = {
            id: Math.floor(Math.random() * 1000), fullname: this.state.person

        }
        if(person.fullname!=="" && person.fullname.length>1){
            persons.push(person)
            this.setState({ persons, person: '' })
            toast.success("کاربر اضافه شد با موفقیت",{
                position:"top-right",
                closeButton:true
            })
        }
      console.log(persons);
    }
    setPerson = (e) => {
        this.setState({ person: e.target.value })
    }
    deletePerson = (personId) => {
        // this.setState(prevstate => {
        //     return {
        //         ...prevstate.persons,
        //         persons: prevstate.persons.filter(item => item.id !== personId)
        //     }
        // })
        const persons = [...this.state.persons]
        const filterPerson = persons.filter(item => item.id !== personId)
      
        const personIndex = persons.findIndex(item => item.id === personId)
        const newPerson = persons[personIndex]
        this.setState({ persons: filterPerson })
        toast.error(`${newPerson.fullname} با موفقیت حذف شد`,{
            position:"top-right",
            closeButton:true
        })
    }
    editHandler = (e, id) => {
        const persons = [...this.state.persons]
        const personIndex = persons.findIndex(item => item.id === id)
        const newPerson = persons[personIndex]
        newPerson.fullname = e.target.value
        //    const myperson=[...persons]
        //    myperson[personIndex]=newPerson
        this.setState({ newPerson })

    }
    render() {
        const { persons } = this.state
        let badgeStayle = ""
        if (persons.length < 4)  badgeStayle='warning'
        
        if (persons.length >= 4) badgeStayle="success"
        
        if (persons.length <= 1) badgeStayle='danger'
        return (

            <div className="rtl text-center">
                <div className="alert alert-info">
                    <h3>مدیریت کننده اشخاص</h3>
                </div>
                <h4 className="alert alert-light">تعداد اشخاص <Badge pill variant={badgeStayle}>{persons.length}</Badge>نفر می باشد</h4>
                <div className="m-2 p-2 ">
                    <form className="form-inline justify-content-center" onSubmit={e => e.preventDefault()}>
                        <div className="input-group w-25">
                            <input className="form-control" onChange={this.setPerson} value={this.state.person} placeholder="ساخن شخص جدید" />
                            <div className="input-group-append">
                                <button type="submit" onClick={this.addPerson} className="btn btn-success fa fa-plus-square" />
                            </div>
                        </div>
                    </form>
                </div>
                <button onClick={this.showHandle} className="btn btn-info" style={{ marginTop: "10px" }}>نمایش اشخاص</button>

                {
                    !this.state.show ?
                        <p>شخصی وجود ندارد</p>
                        :
                        <>

                            <MapPersons persons={persons} deletepersons={this.deletePerson} changedPerson={this.editHandler} />

                        </>
                }
<ToastContainer />
            </div>

        );
    }
}

export default App;