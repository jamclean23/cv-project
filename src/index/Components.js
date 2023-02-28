// Class Components Module


// ====== IMPORTS ======

import React, { Component } from 'react';


// ====== COMPONENTS ======

// Overview
class Overview extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="Overview Component">
                <h1>CV Creation Guide</h1>
                <section>
                    <p>Just fill out each field, and then submit when you're done.</p>  
                    <p>This guide will walk you through the process of writing your own Curriculum Vitae.</p>
                </section>
            </div>
        )
    }
}

// General Information: name, email, phone number
class GeneralInfo extends Component {
    constructor(props) {
        super(props);
    }

    handleCommit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <div className="GeneralInfo Component">
                <h2>General Information</h2>
                <section>
                    <form className="generalForm" onSubmit={this.handleCommit}>
                        <p className="intro">Provide the following information:</p>

                        {/* First */}
                        <label id="firstNameLabel" htmlFor="firstName">First Name: </label>
                        <input id="firstName" name="firstName" type="text"/>

                        {/* Middle */}
                        <label id="middleInitLabel" htmlFor="middleInit">Middle Initial: </label>
                        <input maxLength={1} id="middleInit" name="middleInit" type="text"/>    

                        {/* Last */}
                        <label id="lastNameLabel" htmlFor="lastName">Last Name: </label>
                        <input id="lastName" name="lastName" type="text"/>    

                        {/* Email Address */}
                        <label id="emailLabel" htmlFor="email">Email: </label>
                        <input id="email" name="email" type="text"/>                                

                        {/* Phone Number */}
                        <label id="phoneNumberLabel" htmlFor="phoneNumber">Phone Number: </label>
                        <input id="phoneNumber" name="phoneNumber" type="text"/>                                

                        {/* Submit Button */}
                        <div id="commitWrapper" className="submitWrapper">
                            <input type="submit" value="Commit Changes"/>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

// Educational Experience: school name, title of study, date of study
class EducationExperience extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="EducationalExperience Component">
                <h2>Educational Experience</h2>
            </div>
        );
    }
}

// ===== EXPORTS ======

export {
    Overview,
    GeneralInfo,
    EducationExperience
}