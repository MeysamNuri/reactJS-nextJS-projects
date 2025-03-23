import React, { Component } from "react";
import Persons from "./components/Person/Persons";
import Person from "./components/Person/Person";

class App extends Component {
    state = {
        persons: [],
        person: "",
        showPersons: true
    };

    handleShowPerson = () => {
        this.setState({ showPersons: !this.state.showPersons });
        // console.log(this.state.showPersons);
    };

    handleDeletePerson = id => {
        //filter
        const persons = [...this.state.persons];
        const filteredPersons = persons.filter(p => p.id !== id); //! = =
        this.setState({ persons: filteredPersons });
    };

    handleNameChange = (event, id) => {
        const { persons: allPersons } = this.state;

        const personIndex = allPersons.findIndex(p => p.id === id);
        const person = allPersons[personIndex];
        person.fullname = event.target.value;
        console.log(event);

        const persons = [...allPersons];

        persons[personIndex] = person;
        this.setState({ persons });
    };

    handleNewPerson = () => {
        const persons = [...this.state.persons];
        const person = {
            id: Math.floor(Math.random() * 1000),
            fullname: this.state.person
        };
    if(person.fullname !=="" && person.fullname !==" "){
        persons.push(person);
        this.setState({ persons, person: "" });
    }
    };

    setPerson = event => {
        this.setState({ person: event.target.value });
    };

    render() {
        const { persons, showPersons } = this.state;
        // InlineStyle text-align
        // <div style={{ textAlign: "center" }}>
        const styles = {
            textAlign: "center"
        };

        const bottonStyle = {
            padding: "1em",
            fontFamily: "BYekan",
            backgroundColor: "pink"
        };

        let person = null;

        if (showPersons) {
            person = (
                <Persons
                    persons={persons}
                    personDelete={this.handleDeletePerson}
                    personChange={this.handleNameChange}
                />
            );
        }
        let badgeStyle=[]
        if(persons.length>=3) badgeStyle.push("badge-success")
        if(persons.length<=2) badgeStyle.push("badge-warning")
        if(persons.length <=1) badgeStyle.push("badge-danger")

        return (
            <div className="rtl text-center">
                <div className="alert alert-info">
                    <h2>مدیریت کننده اشخاص</h2>
                </div>
                <h4 className="alert alert-light">تعداد اشخاص <span className={`badge badge-pill ${badgeStyle.join(" ")}`}>{persons.length}</span> نفر می باشد</h4>

                <div className="m-2 p-2">
                    <form className="form-inline justify-content-center" onSubmit={event=>event.preventDefault()}>
                        <div className="input-group ">
                            <input
                                type="text"
                                placeholder="ساخت شخص جدید"
                                style={{ direction: "rtl" }}
                                onChange={this.setPerson}
                                value={this.state.person}
                            />
                            <div className="input-group-prepend">
                                <button type="submit" onClick={this.handleNewPerson}  className="btn btn-sm btn-success fa fa-plus-square"></button>

                            </div>
                        </div>

                    </form>
                </div>

                <button
                    onClick={this.handleShowPerson}
                   className={showPersons?"btn btn-info":"btn btn-warning"}
                >نمایش اشخاص</button>

                {person}
            </div>
        );
    }
}

export default App;
