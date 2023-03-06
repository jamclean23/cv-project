// Main React App

// ====== IMPORTS ======
import React, { Component } from 'react';
import { Overview, GeneralInfo, EducationExperience, PracticalExperience, SubmitSection } from './Components.js';

// ====== Components ======

class App extends Component {
    constructor() {
        super()
        this.state = {
            meta: {
                general: {
                    name: {
                        first: '',
                        middle: '',
                        last: ''
                    },
                    contact: {
                        email: '',
                        phone: ''
                    }
                },
                education: {
                    schools: []
                },
                practical: {
                    jobs: []
                }

            }
            
        }
    }

    updateMeta = (childObj, section) => {
        this.setState((state) => {
            let newObj = {...state};
            newObj.meta[section] = childObj;
            return newObj;
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        return (
        <div>
            <Overview />
            <GeneralInfo updateMeta={this.updateMeta}/>
            <EducationExperience schools={this.state.meta.education.schools} updateMeta={this.updateMeta}/>
            <PracticalExperience jobs={this.state.meta.practical.jobs} updateMeta={this.updateMeta} />
            <SubmitSection/>
        </div>
        );
    }
}

export {
    App
}