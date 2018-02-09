import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Section.css'

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      subjects: [
        {id: 1, name: 'Mathematics'},
        {id: 2, name: 'English'}
      ],
      subject: '',
      section: '',
      subjectKey: 0,
      sectionKey: 0,
      subjectSelected: null,
      sectionSelected: null,
      sections: [
        {id: 1, subject_id: 1, name: 'Numers and numeration'},
        {id: 2, subject_id: 1, name: 'fisher got you'}
      ],
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;

    this.setState({[name]: event.target.value});
  }

  // == functions for subject == //
  selectSubject(event) {

    let subjects = document.getElementsByClassName('subject');

    for (let i = 0; i < subjects.length; i++) {
      subjects[i].className = 'subject';
    }

    event.target.className = 'subject selected';

    //update the selected id
    this.setState({
      subjectSelected: event.currentTarget.dataset.subject_id
    });
     
    // when someone selects a subject, we would re-render the secions
    this.listSection();
  }

  addSubject(subject_name) {

    if (this.state.subject === '') {
      return alert('Please add subject name');
    }

    this.setState( (prevState) => {
      let subjectKey = prevState.subjectKey;
     
      subjectKey += 1; 

      let subjects = this.state.subjects.concat(
             {id: subjectKey, name: this.state.subject}
          );
         // console.log(prevState.subjectSelected);
      return {
        subjects: subjects,
        subjectKey: subjectKey,
      }
    });
    
    // reset the subject
    this.setState({subject: ''});
  }

  // we would remove selected subject when the - button is clicked...
  removeSubject() {
  
    if(!this.state.subjectSelected){
      return alert('please select a subject');
    }
    
    let subjects = this.state.subjects;
    let selectedSubject = this.state.subjectSelected;

    var new_sbjects = subjects.filter(e => {
      return e.id != selectedSubject
    });

    // remove object
    
    this.setState({
      subjects: new_sbjects
    });
  }
// == functions for subject == //

// == functions for section == //
  selectSection(event) {

    let sections = document.getElementsByClassName('section');

    for (let i = 0; i < sections.length; i++) {
      sections[i].className = 'section';
    }

    event.target.className = 'section selected';

    //update the selected id
    this.setState({
      sectionSelected: event.currentTarget.dataset.section_id
    });
  }

  addSection() {

    if (this.state.section === '') {
        return alert('Please add section name');
      }
  
      this.setState( (prevState) => {
        let sectionKey = prevState.sectionKey;
       
        sectionKey += 1; 
  
        let sections = this.state.sections.concat(
               {id: sectionKey, subject_id: 3, name: this.state.section}
            );
           // console.log(prevState.subjectSelected);
        return {
          sections: sections,
          sectionKey: sectionKey,
        }
      });
      // reset the subject
      this.setState({section: ''});
  }

  listSection(subjectId) {
    const new_sections = this.state.sections.map( (section) => {
      return(
            <SectionList 
                key={section.id} 
                name={section.name} 
                selectSection={(event) => this.selectSection(event)}
                subject_id={section.subject_id}
                section_id={section.id}
                handleChange={ () => this.handleChange}
                value={ () => this.state.value}
            />
      )
    })
    return new_sections;
  }
// == functions for section == //

  // when component is mounted, update the keys
  componentDidMount() {
    this.setState({
      subjectKey: this.state.sections.length,
      sectionKey: this.state.subjects.length,
    });
  }

  // we would remove selected subject when the - button is clicked...
  removeSection() {
  
    if(!this.state.sectionSelected){
      return alert('please select a subject');
    }
    
    let sections = this.state.sections;
    let selectedSection = this.state.sectionSelected;

    var new_sections = sections.filter(e => {
      return e.id != selectedSection
    });

    // remove object
    this.setState({
      sections: new_sections
    });
  }

  render() {
    const listSubject = this.state.subjects.map( (subject) => {
        return (
            <Subject 
                 key={subject.id} 
                 name={subject.name} 
                 selectSubject={(event) => this.selectSubject(event)}
                 subject_id={subject.id}
            />
        )
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <div className="form-group">
              <div>
                  <input name="subject" placeholder="Add subject" onChange={this.handleChange} value={this.state.subject} />
                  <input type="button" name="" value="+" className="_button_p" onClick={() => this.addSubject()}/>
                  <input type="button" name="" value="-" onClick={ () => this.removeSubject() } />
              </div>

              <div id="subject">
                {listSubject}
              </div>
          </div>
            <div className="form-group">
              <div>
                  <input name="section" placeholder="Add section" onChange={this.handleChange} value={this.state.section} />
                  <input type="button" name="" value="+" className="_button_p" onClick={() => this.addSection() }/>
                  <input type="button" name="" value="-" onClick={ () => this.removeSection() } />
              </div>

              <div id="section">
                  {this.listSection()}
              </div>

              <div className="section_code">
                  <input name="section_code" placeholder="enter section code"/>
                  <input type="button" name="" value="Submit" className=""/>
              </div>
           </div>
        </div>
      </div>
    );
  }
}

class Subject extends Component {
  render(){
    return (
      <div className="subject" onClick={(event) => this.props.selectSubject(event) } data-subject_id={this.props.subject_id}> 
        {this.props.name}
      </div>
    );
  }
}

class SectionList extends Component {
  render(){
    return (
      <div className="section" onClick={(event) => this.props.selectSection(event) } 
            data-section_id={this.props.section_id} data-subject_id={this.props.subject_id} > 
        {this.props.name}
      </div>
    );
  }
}

export default App;
