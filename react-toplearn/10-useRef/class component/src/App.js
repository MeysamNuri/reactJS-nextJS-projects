import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import Persons from "./components/Person/Persons";
import Header from "./components/common/Header";
import SimpleContext from "./context/SimpleContext";
import NewPerson from "./components/Person/NewPerson";

class App extends Component {
    //Lifecycle Hooks

    constructor() {
        super();
        console.log("App.js Constructor");
    }

    toggleShowHeader = createRef();

    state = {
        persons: [],
        person: "",
        showPersons: true,
        showHeader: true,
        appTitle: "مدیریت کننده اشخاص"
    };

    static getDerivedStateFromProps(props, state) {
        console.log("App.js getDerivedStateFromProps");
        return state;
    }

    componentDidMount() {
        console.log("App.js componentDidMount");
        this.toggleShowHeader.current.click();
        this.btnElement.click();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("App.jsx getSnapshotBeforeUpdate");
        const snapshot = { prevProps, prevState };
        return snapshot;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("App.js componentDidUpdate");
        // console.log(snapshot);
    }

    static contextType = SimpleContext;
    //this.context

    handleShowPerson = () => {
        this.setState({ showPersons: !this.state.showPersons });
    };

    handleShowHeader = () => {
        this.setState({ showHeader: !this.state.showHeader });
    };

    handleDeletePerson = id => {
        const persons = [...this.state.persons];
        const filteredPersons = persons.filter(p => p.id !== id); //! = =
        this.setState({ persons: filteredPersons });

        const personIndex = persons.findIndex(p => p.id === id);
        const person = persons[personIndex];

        toast.error(`${person.fullname} با موفقیت حذف شد`, {
            position: "top-right",
            closeOnClick: true
        });
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

        if (person.fullname !== "" && person.fullname !== " ") {
            persons.push(person);
            this.setState({ persons, person: "" });

            toast.success("شخصی با موفقیت اضافه شد.", {
                position: "bottom-right",
                closeButton: true,
                closeOnClick: true
            });
        }
    };

    setPerson = event => {
        this.setState({ person: event.target.value });
    };

    render() {
        console.log("App.js render()");

        const { persons, showPersons, showHeader } = this.state;

        // let person = null;
        // let header = null;

        // if (showPersons) {
        //     person = (

        //     );
        // }

        // if (showHeader) {
        //     header = (
        //         <Header
        //             persons={this.state.persons}
        //             appTitle="مدیریت کننده اشخاص"
        //         />
        //     );
        // }

        return (
            <div className="rtl text-center">
                {/* {header} */}

                {showHeader ? (
                    <Header
                        persons={this.state.persons}
                        appTitle="مدیریت کننده اشخاص"
                    />
                ) : null}

                <Button
                    onClick={this.handleShowHeader}
                    variant="primary"
                    ref={this.toggleShowHeader}
                >
                    نمایش هدر
                </Button>

                <NewPerson
                    person={this.state.person}
                    setPerson={this.setPerson}
                    handleNewPerson={this.handleNewPerson}
                />

                <Button
                    onClick={this.handleShowPerson}
                    variant={showPersons ? "info" : "danger"}
                    ref={el => {
                        this.btnElement = el;
                    }}
                >
                    نمایش اشخاص
                </Button>

                {/* {person} */}
                {showPersons ? (
                    <Persons
                        persons={persons}
                        personDelete={this.handleDeletePerson}
                        personChange={this.handleNameChange}
                    />
                ) : null}
                <ToastContainer />
            </div>
        );
    }
}

export default App;
