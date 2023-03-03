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
                        <div id="commitGeneralWrapper" className="submitWrapper">
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

    handleCommit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <div className="EducationalExperience Component">
                <h2>Educational Experience</h2>
                <section>
                    <form className="edEForm" onSubmit={this.handleCommit}>
                        <p className="intro">Please provide the following information about your
                             past education:</p>

                        {/* School Name */}
                        <label htmlFor="schlName">Name of School: </label>
                        <input id="schlName" type="text"/>

                        {/* Subject */}
                        <label htmlFor="studyTitle" >Title of Study: </label>
                        <input id="studyTitle" type="text"/>

                        {/* Date Attended */}
                        <label htmlFor="dateAttended" >Date Attended:</label>
                        <input id="dateAttended" type="text"/>

                        {/* Submit Button */}
                        <div id="commitEdEFormWrapper" className="submitWrapper">
                            <input type="submit" value="Commit Changes"/>
                        </div>
                    </form>
                </section>
                <SubmittedExperience/>
            </div>
        );
    }
}

// Practical Experience
class PracticalExperience extends Component {
    constructor(props) {
        super(props);
    }

    handleCommit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <div className="practical Component">
                <h2>Practical Experiences</h2>
                <section>
                    <form className="practicalForm" onSubmit={this.handleCommit}>
                        <p className="intro">Please provide the following information about your
                             past practical experiences:</p>

                        {/* Company Name */}
                        <label htmlFor="companyName">Name of Company: </label>
                        <input id="companyName" type="text"/>

                        {/* Position Title */}
                        <label htmlFor="posTitle">Title of Position: </label>
                        <input id="posTitle" type="text"/>

                        {/* Responsibilities */}
                        <label htmlFor="responsibilities">Responsibilities: </label>
                        <input id="responsibilities" type="text"/>

                        {/* Date of Employment */}
                        <label htmlFor="dateWrapper">Dates Employed:</label>
                        <div id="dateWrapper">
                            <label>Start: </label>
                            <input type="date" />
                            <label>End: </label>
                            <input type="date"/>
                        </div>

                        {/* Submit Button */}
                        <div id="commitPracticalWrapper" className="submitWrapper">
                            <input type="submit" value="Commit Changes"/>
                        </div>
                    </form>
                </section>
                <SubmittedExperience />
            </div>
        );
    }
}

class SubmitSection extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <div className="submitSection Component">
                <h2>Review and Submit</h2>
                <section>
                    <form className="submitSectionForm" onSubmit={this.handleSubmit}>
                        <p className="intro">Please review all commited information, and then click Submit to 
                            generate your Curriculum Vitae</p>
                        <div id="submitSectionWrapper" className="submitWrapper">
                            <input type="submit" value="Commit Changes"/>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}


class SubmittedExperience extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="submittedExperience">
                <h3>Submitted Experience</h3>
            </div>
        );
    }
}
// ===== EXPORTS ======

export {
    Overview,
    GeneralInfo,
    EducationExperience,
    PracticalExperience,
    SubmitSection
}