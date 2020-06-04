import React, { Component } from 'react';
import './App.css';
import moodleXMLtoJson from 'moodlexml-to-json';
import aikenToMoodleXML from 'aiken-to-moodlexml';
import sampleAiken from './sampleAiken';
// import * as Moodle from './moodle';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: sampleAiken,
      right :"",
      from: 'txt',
      to: 'xml',
      es: false,
      nsnc: false,
      penalty: false,
      shuffle: false,
      matchingToMultiple: false,
    }
  }

  
  render() {
    var opcion = "'#{option}'"
    const SpanishTooltip = props => (
      <Tooltip {...props}>Spanish description</Tooltip>
    );

    const EmptyOptionTooltip = props => (
      <Tooltip {...props}>Empty option description</Tooltip>
    );

    const ProportionalPenaltyTooltip = props => (
      <Tooltip {...props}>Proportional penalty description</Tooltip>
    );

    const ShuffleTooltip = props => (
      <Tooltip {...props}>Shuffle description</Tooltip>
    );

    const MatchingToMultipleChoiceTooltip = props => (
      <Tooltip {...props}>
        <label>Transform matching question to multiple choice. It is necessary to include the text {opcion} for craeting the question properly</label>
        <span className="font-weight-bold">The input matching question must be in Aiken format</span>
      </Tooltip>
    );

    return (
      <div className="App">
        <header>
          <h1> <i className="material-icons">school</i> QUIZ converter</h1>
          <div className="links">
            <a target="_blank" rel="noreferrer noopener" href="https://docs.moodle.org/38/en/Moodle_XML_format">MoodleXML</a>
            <a target="_blank" rel="noreferrer noopener" href="https://docs.moodle.org/38/en/Aiken_format">Aiken</a>
          </div>
        </header>
       <div className="content"> 
        
          <div className="content-col left">
            <ul className="list-group list-group-horizontal mb-2 mt-2">

              <div className="col-md-4 my-auto"> 
                <h2>From</h2>
                <select onChange={(e)=>{this.setState({from: e.target.value})}} value={this.state.from}>
                  <option value="xml" >MoodleXML</option>
                  <option value="txt" >Aiken</option>
                  {/* <option disabled value="json" >JSON</option> */}
                </select>
              </div>
              <div className="col-md-4 my-auto">
                <div className="text-center">
                  <button className="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    New Question
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <table>
                        <tbody>
                          <tr>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "multichoice")} type="button" className="btn btn-link">multichoice</button>
                            </td>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "essay")} type="button" className="btn btn-link">essay</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "shortanswer")} type="button" className="btn btn-link">shortanswer</button>
                            </td>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "truefalse")} type="button" className="btn btn-link">truefalse</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "description")} type="button" className="btn btn-link">description</button>
                            </td>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "cloze")} type="button" className="btn btn-link">cloze</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "numerical")} type="button" className="btn btn-link">numerical</button>
                            </td>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "order")} type="button" className="btn btn-link">order</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button onClick={this.insertNewQuestion.bind(this, "matching")} type="button" className="btn btn-link">matching</button>
                            </td>
                            <td>
                              
                            </td>
                          </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                      <button onClick={this.insertNewQuestion.bind(this, "matching-to-multiplechoice")} type="button" className="btn btn-link">matching2multiplechoice</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-auto"> 
              <div className="dropdown text-center">
                  <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Settings
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.es} onChange={()=>this.setState({es: !this.state.es})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={SpanishTooltip}>
                                  <label className="lc">Spanish</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.nsnc} onChange={()=>this.setState({nsnc: !this.state.nsnc})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={EmptyOptionTooltip}>
                                  <label className="lc">Empty option</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.penalty} onChange={()=>this.setState({penalty: !this.state.penalty})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={ProportionalPenaltyTooltip}>
                                  <label className="lc">Proportional penalty</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.shuffle} onChange={()=>this.setState({shuffle: !this.state.shuffle})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={ShuffleTooltip}>
                                  <label className="lc">Shuffle</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.matchingToMultiple} onChange={()=>this.setState({matchingToMultiple: !this.state.matchingToMultiple})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={MatchingToMultipleChoiceTooltip}>
                                  <label className="lc">Matching to multiple choice</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </ul>

            <textarea onChange={(e)=>{this.onWrite(e,'left')}} value={this.state.left}></textarea>
            <div className="buttons">
              <button onClick={this.convert.bind(this)}>
                <i className="material-icons">play_arrow</i>Convert
              </button>
              <button onClick={this.reset.bind(this)}>
                <i className="material-icons">replay</i>Reset
              </button>
            </div>
          </div>
          <div className="content-col right">
            <div><h2>To</h2>
            <select onChange={(e)=>{this.setState({to: e.target.value})}} value={this.state.to}>
              <option value="xml" >MoodleXML</option>
              <option value="txt" >Aiken</option>
              <option value="json" >JSON</option>
            </select>
            </div>
            <textarea ref="right" onChange={(e)=>{this.onWrite(e,'right')}} value={this.state.right}></textarea>
            <div className="buttons">
              <button onClick={()=>{
                this.refs.right.select();
                document.execCommand('copy');
              }}>
                <i className="material-icons">file_copy</i>Copy
              </button>
              <button onClick={()=>{this.download("quiz."+this.state.to, this.state.right)}}>
                <i className="material-icons">cloud_download</i>Download
              </button>
            </div>
          </div>
       </div>
      </div>
    );
  }
  convert() {
    var {from, to, left} = this.state;
    console.log(from, to, left)

    if (from === "xml" && to === "json") {
      moodleXMLtoJson(left, (res,err)=>{
        if (err) {
          console.error(err);
          alert("Not a valid MoodleXML file");
          this.setState({right: ''});
          return;
        }
        let right = JSON.stringify(res, null, 2)
        this.setState({right});
      })
    } else if (from === "txt" && to === "json") {
      if(this.state.matchingToMultiple){
        left = this.findMatchigQuestionsAndChange(left);
      }
      aikenToMoodleXML(left, (result, error)=>{
        console.log(result, error)
        moodleXMLtoJson(result.replace(/\t/g, "  "), (res,err)=>{
          if (err) {
            console.error(err);
            alert("Not a valid Aiken file");
            this.setState({right: ''});
            return;
          }
          let right = JSON.stringify(res, null, 2)
          
          this.setState({right});
        })
      }, {lang: this.state.es ? "es": "en", penalty: this.state.penalty, nsnc: this.state.nsnc, shuffle: this.state.shuffle});
    } else if (from === "txt" && to === "xml") {
      if(this.state.matchingToMultiple){
        left = this.findMatchigQuestionsAndChange(left);
      }
      aikenToMoodleXML(left, (res, err) => {
        if (err) {
          console.error(err);
          alert("Not a valid Aiken file");
          this.setState({right: ''});
          return;
        }
          let right = (res)
          .replace(/\t/g, "  ");
          
          this.setState({right});
      }, {lang: this.state.es ? "es": "en", penalty: this.state.penalty, nsnc: this.state.nsnc, shuffle: this.state.shuffle});
    } else if (from === "xml" && to === "xml") {
      this.setState({right: left});
    }else if (from === "txt" && to === "txt"){
      if(this.state.matchingToMultiple){
        left = this.findMatchigQuestionsAndChange(left);
      }
      this.setState({right: left});
    }
  }

  reset() {
    this.setState({left:"", right: ""});
  }

  onWrite(e,side){
    this.setState({ [side]: e.target.value});
  }

  download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  componentDidMount(){
    window.onbeforeunload = (e) => {
      let {left, right, from, to, es, penalty, nsnc, shuffle} = this.state;
      if (left === "") {
        localStorage.removeItem("moodleXMLtoJson");
      } else {
        localStorage.moodleXMLtoJson = JSON.stringify({left, right, from, to, es, penalty, nsnc, shuffle});
      }
    };
    if (localStorage.moodleXMLtoJson) {
      const {left, from, to, es, penalty, nsnc, shuffle} = JSON.parse(localStorage.moodleXMLtoJson);
      this.setState({left, from, to, es, penalty, nsnc, shuffle});
    }
    // window.Moodle = Moodle;
  }

  findMatchigQuestionsAndChange(questions){
    var t = questions.split("\n");    
    var result = '';
    var write = true;
    var aux = '';
    for (var i = 0;i<t.length;i++){
      if(write && t[i].includes("matching")){
        write = false
      } else if (!write && (t[i].includes("matching") || t[i].includes("essay") || t[i].includes("shortanswer") || t[i].includes("truefalse") || t[i].includes("description") || t[i].includes("cloze") || t[i].includes("numerical") || t[i].includes("order") || t[i].includes("multichoice"))){
        write = true
        result = result + this.matchingAikenToMultipleMoodleXML(aux);        
        aux = ''
      }else if (!write && i+1 === t.length){
        aux = aux + t[i];
        write = false
        result = result + this.matchingAikenToMultipleMoodleXML(aux);        
        aux = ''
      }
      if(write){
        result = result + t[i] + "\n";
      }else{
        aux = aux + t[i] +"\n";
      }
    }
    console.log(result);
    return result;
    
  }

  matchingAikenToMultipleMoodleXML(matchingQuestion){
    var m = matchingQuestion.split("\n");
    
    var cnt = 1;
    var question = ['','']
    var options = [];
    var answers = [];
    var feedback = "Good";
    for (var i = 0;i < m.length;i++){
      console.log(m[i]);
      
      if (m[i].includes('#{option}')){
        question = m[i].split('#{option}');        
      }
      if(i+1 <= m.length && (m[i].includes(cnt.toString()+'.') && m[i+1].includes("match"))){        
        options.push(m[i].split(cnt+'. ')[1]);
        answers.push(m[i+1].split('match: ')[1]);
        cnt ++;
      }else if(m[i].includes("Feedback:")){
        console.log("aaaa");
        
        feedback = m[i].split('Feedback: ')[1]
      }
    }

    console.log(feedback);
    

    var result = ''

    for ( var k = 0; k < options.length;k++){
      result = result+"multichoice\n"
      result = result+question[0]+options[k]+question[1]+"\n";
      for(var j = 0; j < answers.length;j++){
        result = result+String.fromCodePoint(65+j)+". "+answers[j]+"\n"
      }
      result = result+"Answer: "+String.fromCodePoint(65+k)+"\n"
      result = result+"Feedback: "+feedback+"\n\n"
    }
    
    return result
  }

  aikenToMoodle(aikenText){
    var re = '';

    aikenToMoodleXML(aikenText, (res, err) => {
      if (err) {
        console.error(err);
        alert("Not a valid Aiken file");
        return;
      }
        re = (res).replace(/\t/g, "  ");
        
    }, {lang: this.state.es ? "es": "en", penalty: this.state.penalty, nsnc: this.state.nsnc, shuffle: this.state.shuffle});

    return re
  }

  insertNewQuestion(type){

const multichoice =  `multichoice
X. When an organization decides to control the flow of incident information within the IT organization, which ITIL process would it be putting in place?
A. Availability Management
B. Change Management
C. Incident Management
D. Problem Management
Answer: C, D
gfeed. Duh!

`
const essay =  `essay
X. The new role of social blogging in e-learning.
gfeed. Write something about Twitter, Facebook from the aspects of teaching and colloboration.

`
const shortanswer =  `shortanswer
X. Calculate: 2 + 2 
Answer: 4, four

`

const truefalse =  `truefalse
X. The founder of "Apple" was Steve Jobs.
Answer: True
Feedback: Steve Jobs is the CEO of Apple, which he co-founded in 1976.

`
const description =  `description
X. Open Office is the alternative to Microsoft Office.

`

const cloze =  `cloze
X. Infrastructure <{1:MULTICHOICE:=Monitoring~Controlling~Service} will provide support teams with alerts directly allowing for faster resolution. 
Such alerts do not need to be recorded in the Incident Management tool as there is little added value in this {1:MULTICHOICE:=true~false}. 
Typically the incident will be resolved automatically before the customer recognises it.

`
const numerical =  `numerical
X. How many books are in ITIL V3? Answer only with a number.
Answer: 5, 7

`
const order =  `order
X. Place in ascending order
1. 200
2. 500
3. 100
ANSWER: 3,1,2

`
const matching =  `matching
X. Match cities and countries
1. Yakutsk
match: Russia
2. Tampere
match: Finland
3. Harbin
match: China
Feedback: Good job!

`
const matching_to_multiplechoice =  `matching
X. In which country is #{option}
1. Yakutsk
match: Russia
2. Tampere
match: Finland
3. Harbin
match: China
Feedback: Good job!

`

    switch (type) {
      case "multichoice":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + multichoice})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(multichoice)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "essay":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + essay})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(essay)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "shortanswer":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + shortanswer})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(shortanswer)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "truefalse":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + truefalse})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(truefalse)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "description":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + description})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(description)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "cloze":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + cloze})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(cloze)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "numerical":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + numerical})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(numerical)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "order":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + order})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(order)})
        }else{
          console.log("Error not possible state");
        }
        break;
      case "matching":
        if(this.state.from === "txt"){
          this.setState({left : this.state.left + matching})
        }else if(this.state.from === "xml"){
          this.setState({left : this.state.left + this.aikenToMoodle(matching)})
        }else{
          console.log("Error not possible state");
        }
        break;
        case "matching-to-multiplechoice":
          if(this.state.from === "txt"){
            this.setState({left : this.state.left + matching_to_multiplechoice})
          }else if(this.state.from === "xml"){
            this.setState({left : this.state.left + this.aikenToMoodle(matching_to_multiplechoice)})
          }else{
            console.log("Error not possible state");
          }
          break;
      default:
        console.log("Error with type", type);
        break;
    }
    
  }
  
  

}

export default App;
