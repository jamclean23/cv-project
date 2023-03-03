// Main React App

// ====== IMPORTS ======
import React, { Component } from 'react';
import { Overview, GeneralInfo, EducationExperience, PracticalExperience, SubmitSection } from './Components.js';

// ====== Components ======

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <div>
            <Overview />
            <GeneralInfo/>
            <EducationExperience/>
            <PracticalExperience/>
            <SubmitSection/>
        </div>
        );
    }
}

export {
    App
}