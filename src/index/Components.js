// Class Components Module


// ====== IMPORTS ======
import React, { Component } from 'react';
import Uniqid from 'uniqid';
import editIcon from './assets/edit.png';


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

        // Info must be declared in the format of meta > section > field: value
        this.state = {
            meta: {
                name: {
                    first: '',
                    middle: '',
                    last: '',
                },
                contact: {
                    email: '',
                    phone: ''
                }
            },
            committed: false
        }
    }

    handleCommit = (event) => {
        event.preventDefault();

        let state = this.state;

        if (this.state.committed === false) {

            // Toggle committed status
            this.setState((state) => {
                let newObj = structuredClone(state);
                newObj.committed = true;
                return newObj;
            });
            
            // Commit changes to App meta
            this.props.updateMeta(structuredClone(state).meta, 'general');

        } else if (this.state.committed) {

            // Toggle committed status
            this.setState((state) => {
                let newObj = structuredClone(state);
                newObj.committed = false;
                return newObj;
            });

            // set newObj to default and send to updateMeta
            let newObj = structuredClone(state);

            for (const section in newObj.meta) {
                for (const property in newObj.meta[section]) {
                    newObj.meta[section][property] = '';
                }
            }

            this.props.updateMeta(newObj.meta, 'general');
            
        }
    }

    handleChange = (passedSection, field, event) => {

        this.setState((state) => {
            let newObj = structuredClone(state);

            // Iterate through each section
            for (const section in newObj.meta) {
                if (section === passedSection) {
                    // Iterate through each property in section
                    for (const property in newObj.meta[section]) {
                        // If the field of the new content differs from state, assign it to the new object
                        if (property === field) {
                            newObj.meta[section][property] = event.target.value;
                        }
                    }
                }
            }
            
            return newObj;
        });
    }

    render() {

        // Either display text inputs or display committed info
        let intro;
        let first;
        let middle;
        let commitEditButton;
        let last;
        let email;
        let phone;

        if (this.state.committed) {
            intro = <p className="intro"></p>;
            first = <span id="firstName" name="firstName" type="text" 
                onChange={this.handleChange.bind(this, 'name', 'first')}>{this.state.meta.name.first}</span>;
            commitEditButton = <input type="submit" value="Edit"/>;
            middle = <span id="middleInit">{this.state.meta.name.middle}</span>;
            last = <span id="lastName">{this.state.meta.name.last}</span>;
            email = <span id="email">{this.state.meta.contact.email}</span>
            phone = <span id="phoneNumber">{this.state.meta.contact.phone}</span>;
        } else {
            intro = <p className="intro">Provide the following information:</p>;
            first = <input id="firstName" name="firstName" type="text" value={this.state.meta.name.first} 
                onChange={this.handleChange.bind(this, 'name', 'first')}/>;
            commitEditButton = <input type="submit" value="Commit Changes"/>;
            middle = <input maxLength={1} id="middleInit" name="middleInit" type="text" 
                value={this.state.meta.name.middle} onChange={this.handleChange.bind(this, 'name', 'middle')}/>;
            last = <input id="lastName" name="lastName" type="text"
                value={this.state.meta.name.last} onChange={this.handleChange.bind(this, 'name', 'last')}/>;
            email = <input id="email" name="email" type="text"
                value={this.state.meta.contact.email} onChange={this.handleChange.bind(this, 'contact', 'email')}/>;
            phone = <input id="phoneNumber" name="phoneNumber" type="text"
                value={this.state.meta.contact.phone} onChange={this.handleChange.bind(this, 'contact', 'phone')}/>;
        }

        return (
            <div className="GeneralInfo Component">
                <h2>General Information</h2>
                <section>
                    <form className="generalForm" onSubmit={this.handleCommit}>
                        {/* Introduction Message */}
                        {intro}

                        {/* First */}
                        <label id="firstNameLabel" htmlFor="firstName">First Name: </label>
                        {first}

                        {/* Middle */}
                        <label id="middleInitLabel" htmlFor="middleInit">Middle Initial: </label>
                        {middle}

                        {/* Last */}
                        <label id="lastNameLabel" htmlFor="lastName">Last Name: </label>
                        {last}   

                        {/* Email Address */}
                        <label id="emailLabel" htmlFor="email">Email: </label>
                        {email}                                

                        {/* Phone Number */}
                        <label id="phoneNumberLabel" htmlFor="phoneNumber">Phone Number: </label>
                        {phone}

                        {/* Submit Button */}
                        <div id="commitGeneralWrapper" className="submitWrapper">
                            {commitEditButton}
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
        this.state = {
            meta: { 
                schools: {
                    schoolName: '',
                    studyTitle: '',
                    dateStarted: '',
                    dateEnded: '',
                }
                
            }
        };
    }

    populateFields = (section, experienceItem) => {
        this.setState((state) => {
            let newObj = structuredClone(state);
            let itemObj = (section === 'practical') ? 'jobs' : 'schools';
            // Copy enumerable fields from experienceItem to new object

            for (const property in experienceItem) {
                newObj.meta[itemObj][property] = experienceItem[property];
            }

            return newObj;

        });
    }
    
    handleCommit = (event) => {
        event.preventDefault();
        let state = this.state;
        // Copy the current schools object and assign a non enumerable and unique Id
        let workingSchool = structuredClone(state.meta.schools);
        Object.defineProperty(workingSchool, 'key', {
            enumerable: false,
            value: Uniqid()
        });

        // Make a new object, containing the parent's existing schools and the new item to be added
        const education = {};
        education.schools = this.props.schools.concat(workingSchool);
        this.props.updateMeta(education, 'education');

        // Clear template object
        this.setState((state) => {
            let newObj = structuredClone(state);
            for (const property in newObj.meta.schools) {
                newObj.meta.schools[property] = '';
            }
            return newObj;
        });
    }

    handleChange = (field, event) => {
        this.setState((state) => {
            let newObj = structuredClone(state);
            newObj.meta.schools[field] = event.target.value;
            return newObj;
        });
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
                        <input id="schlName" type="text" value={this.state.meta.schools.schoolName} 
                            onChange={this.handleChange.bind(this, 'schoolName')}/>

                        {/* Subject */}
                        <label htmlFor="studyTitle" >Title of Study: </label>
                        <input id="studyTitle" type="text" value={this.state.meta.schools.studyTitle}
                         onChange={this.handleChange.bind(this, 'studyTitle')}/>

                        {/* Date Attended */}
                        <label htmlFor="dateAttended" >Date Attended:</label>
                        <div id="dateAttended">
                            <label>Start: </label>
                            <input type="date" value={this.state.meta.schools.dateStarted} 
                                 onChange={this.handleChange.bind(this, 'dateStarted')}/>
                            <label>End: </label>
                            <input type="date" value={this.state.meta.schools.dateEnded}
                                 onChange={this.handleChange.bind(this, 'dateEnded')}/>
                        </div>

                        {/* Submit Button */}
                        <div id="commitEdEFormWrapper" className="submitWrapper">
                            <input type="submit" value="Commit Changes"/>
                        </div>
                    </form>
                </section>
                <SubmittedExperience populateFields={this.populateFields} removeExperience={this.props.removeExperience} experience={this.props.schools} 
                    section="education"/>
            </div>
        );
    }
}

// Practical Experience
class PracticalExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meta: {
                jobs: {
                    companyName: '',
                    posTitle: '',
                    responsibilities: '',
                    dateStarted: '',
                    dateEnded: ''
                }
            }
        };
    }

    populateFields = (section, experienceItem) => {
        this.setState((state) => {
            let newObj = structuredClone(state);
            let itemObj = (section === 'practical') ? 'jobs' : 'schools';
            // Copy enumerable fields from experienceItem to new object

            for (const property in experienceItem) {
                newObj.meta[itemObj][property] = experienceItem[property];
            }

            return newObj;
        });
    }

    handleCommit = (event) => {
        event.preventDefault();

        // Copy the current schools object and assign a non enumerable and unique Id
        let state = this.state;
        let workingJob = structuredClone(state.meta.jobs);
        Object.defineProperty(workingJob, 'key', {
            enumerable: false,
            value: Uniqid()
        });

        // Make a new object, containing the parent's existing jobs and the new item to be added
        const practical = {};
        practical.jobs = this.props.jobs.concat(workingJob);
        this.props.updateMeta(practical, 'practical');
        
        // Clear template object
        this.setState((state) => {
            let newObj = structuredClone(state);
            for (const property in newObj.meta.jobs) {
                newObj.meta.jobs[property] = '';
            }
            return newObj;
        });
    }

    handleChange = (field, event) => {
        this.setState((state) => {
            let newObj = structuredClone(state);
            newObj.meta.jobs[field] = event.target.value;
            return newObj;
        });
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
                        <input id="companyName" type="text" value={this.state.meta.jobs.companyName} 
                            onChange={this.handleChange.bind(this, 'companyName')}/>

                        {/* Position Title */}
                        <label htmlFor="posTitle">Title of Position: </label>
                        <input id="posTitle" type="text" value={this.state.meta.jobs.posTitle} 
                            onChange={this.handleChange.bind(this, 'posTitle')}/>

                        {/* Responsibilities */}
                        <label htmlFor="responsibilities">Responsibilities: </label>
                        <input id="responsibilities" type="text" value={this.state.meta.jobs.responsibilities} 
                            onChange={this.handleChange.bind(this, 'responsibilities')}/>

                        {/* Date of Employment */}
                        <label htmlFor="dateEmployedWrapper">Dates Employed:</label>
                        <div id="dateEmployedWrapper">
                            <label>Start: </label>
                            <input type="date" value={this.state.meta.jobs.dateStarted} 
                            onChange={this.handleChange.bind(this, 'dateStarted')}/>
                            <label>End: </label>
                            <input type="date" value={this.state.meta.jobs.dateEnded} 
                            onChange={this.handleChange.bind(this, 'dateEnded')}/>
                        </div>

                        {/* Submit Button */}
                        <div id="commitPracticalWrapper" className="submitWrapper">
                            <input type="submit" value="Commit Changes"/>
                        </div>
                    </form>
                </section>
                <SubmittedExperience populateFields={this.populateFields} removeExperience={this.props.removeExperience} experience={this.props.jobs} 
                    section="practical"/>
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
        console.log(html2pdf);
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
                            <input type="submit" value="Submit"/>
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

    handleEditClick = (section, item) => {
        this.props.populateFields(section, item);
        this.props.removeExperience(section, item.key);
    }

    renderExperience = (experience, removeExperience, section) => {
        // Iterate through experience, display contents of each
        
        let itemsJsx = experience.map((item) => {
            let jsxItem = [];
            for (const property in item) {
                jsxItem.push( 
                    <div className="experienceProp" key={Uniqid()}>
                        <label>{getPropertyLabel(property)}</label>
                        <span>{item[property]}</span>
                    </div>
                );
            }
            return (
                        <div key={Uniqid()} className="experienceItem">{jsxItem}
                            <div className="itemBtnWrapper">
                                <button onClick={this.handleEditClick.bind(this, section, item)} 
                                    className="editBtn"><img src={editIcon}/></button>
                                <button onClick={removeExperience.bind(this, section, item.key)} 
                                    className="removeBtn">X</button>
                            </div>
                        </div>
                    );
        });
        return (itemsJsx.length > 0)
            ? (<section>{itemsJsx}</section>)
            : '';

        function getPropertyLabel (property) {
            switch (property) {
                case 'schoolName':
                    return 'Name of School: ';
                case 'studyTitle':
                    return 'Title of Study: ';
                case 'dateStarted':
                    return 'From: ';
                case 'dateEnded':
                    return 'Until: ';
                case 'companyName':
                    return 'Name of Company: ';
                case 'posTitle':
                    return 'Position Title: ';
                case 'responsibilities':
                    return 'Responsibilities: ';
                default:
                    return 'NOT FOUND';
            }
        }
    }

    render() {
        return (
            <div id="submittedExperience">
                <h3>Submitted Experience</h3>
                {this.renderExperience(this.props.experience, this.props.removeExperience, this.props.section)}
            </div>
        );
    }
}

class StyledHtml extends Component {
    constructor(props) {
        super(props);
    }

    renderExperience = (section) => {
        const itemArray = (section === 'practical') ? 'jobs' : 'schools';
        let itemsJsx = this.props.state[section][itemArray].map((item) => {
            
            let resultArray = [];

            for (const property in item) {
                let content;

                if (property === 'schoolName' || property === 'companyName') {
                    content = <p className="cvExperienceName" key={Uniqid()}>{item[property]}</p>;
                } else if (property === 'studyTitle' || property === 'posTitle') {
                    content = <p className="cvExperienceTitle" key={Uniqid()}>{item[property]}<span>{item.dateStarted} to {item.dateEnded}</span></p>;
                } else if (property === 'dateStarted' || property === 'dateEnded') {
                    content = '';
                } else {
                    content = <p key={Uniqid()}>{getPropertyLabel(property)} {item[property]}</p>;
                }

                resultArray.push(content);
            }

            return (
                <div className="experienceOutput" key={Uniqid()}>
                    {resultArray}
                </div>);
        });

        function getPropertyLabel (property) {
            switch (property) {
                case 'schoolName':
                    return 'Name of School: ';
                case 'studyTitle':
                    return 'Title of Study: ';
                case 'dateStarted':
                    return 'From: ';
                case 'dateEnded':
                    return 'Until: ';
                case 'companyName':
                    return 'Name of Company: ';
                case 'posTitle':
                    return 'Position Title: ';
                case 'responsibilities':
                    return 'Responsibilities: ';
                default:
                    return 'NOT FOUND';
            }
        }

        return (
            <section className="cvSection" key={Uniqid()}>
                {itemsJsx}
            </section>
        );
    }

    render() {
        const contentObj = this.props.state;

        
        return(
        <div className="styledHtml">
            <h2 className="cvName">{contentObj.general.name.first} {contentObj.general.name.middle} {contentObj.general.name.last}</h2>
            <div className="cvContacts">
                <span>{contentObj.general.contact.phone}</span>
                <span>*</span>
                <span>{contentObj.general.contact.email}</span>
            </div>

            <h2 className="cvHeader">Education</h2>
            {this.renderExperience('education')}
            <h2 className="cvHeader">Experience</h2>
            {this.renderExperience('practical')}
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
    SubmitSection,
    StyledHtml
}