// Main React App

// ====== IMPORTS ======
import React, { Component } from 'react';
import { Overview, GeneralInfo, EducationExperience } from './Components.js';

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
        </div>
        );
    }
}

export {
    App
}