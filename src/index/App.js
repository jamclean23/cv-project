// Main React App

// ====== IMPORTS ======
import React, { Component } from 'react';
import { Overview, GeneralInfo, EducationExperience, PracticalExperience, SubmitSection, StyledHtml } from './Components.js';

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
            let newObj = structuredClone(state);
            newObj.meta[section] = childObj;
            return newObj;
        });
    }

    removeExperience = (section, toDeleteKey) => {

            // Determine path to arrays containing items
            let itemArray = (section === 'education') ? 'schools' : 'jobs';

            this.setState((state) => {
                let newObj = structuredClone(state);

                // Search for an item that matches the key for deletion
                newObj.meta[section][itemArray] = this.state.meta[section][itemArray].filter((item)=> {
                    return item.key !== toDeleteKey;
                });

                return newObj;
            });
    }

    render() {
        return (
        <div>
            <Overview />
            <GeneralInfo updateMeta={this.updateMeta}/>
            <EducationExperience removeExperience={this.removeExperience} schools={this.state.meta.education.schools} 
                updateMeta={this.updateMeta}/>
            <PracticalExperience removeExperience={this.removeExperience} jobs={this.state.meta.practical.jobs} 
                updateMeta={this.updateMeta} />
            <SubmitSection/>
            <StyledHtml className="styledHtml" state={this.state.meta}/>
        </div>
        );
    }
}

export {
    App
}