import React,{ Component  } from 'react'
import './wordcard.scss'
import Google from './search.png'
import Save from './tack-save-button.png'

class Wordcard extends Component {
  constructor() {
    super()
    this.state = {
      definition : {},
      hindiDefinitoin : '',
      hindiMeaning :''
    }
    this.fetchWordDefination = this.fetchWordDefination.bind(this)
    this.gTranslator = this.gTranslator.bind(this)
    this.hindiMeaningTranslator = this.hindiMeaningTranslator.bind(this)
  }

  componentWillMount(){
    this.fetchWordDefination()
  }

  gTranslator(str){
    fetch(`https://imabhi.herokuapp.com/translator?pharse=${str}`).then((response) => {
      response.json().then(def => {
        this.setState({hindiDefinitoin : def.data})
      })
    }).catch(error => {
      throw(error);
    })
  }

  hindiMeaningTranslator(str){
    fetch(`https://imabhi.herokuapp.com/translator?pharse=${str}`).then((response) => {
      response.json().then(def => {
        this.setState({hindiMeaning : def.data})
      })
    }).catch(error => {
      throw(error);
    })
  }

  fetchWordDefination(){
    fetch(`http://api.wordnik.com:80/v4/word.json/${this.props.word}/definitions?limit=200&includeRelated=true&sourceDictionaries=wiktionary&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`, {mode: 'cors'}).then((response) => {
      response.json().then(def => {
        if(def.length > 0){
          this.setState({definition : def[0]})
          this.gTranslator(def[0].text)
          this.hindiMeaningTranslator(this.props.word)
        }else this.setState({definition : {}})
      })
    }).catch(error => {
      throw(error);
    })
  }


  render(){
    return (
      <div className="wordcard">
        <div className="word-title">{this.props.word.charAt(0)}</div>
        <div className="word-desc">
          <h3>{this.props.word} {this.state.definition.partOfSpeech && <span>({this.state.definition.partOfSpeech})</span>}</h3>
          <h3>{this.state.hindiMeaning}</h3>
          <p>{this.state.definition.text}</p>
          <p>{this.state.hindiDefinitoin}</p>
          <div className="word-action">
            <ul>
              <li><img  src={Save}/></li>
              <li><a href={`https://www.google.co.in/search?q=${this.props.word}&gws_rd=cr&dcr=0&ei=uYf9WYy3CszOvgTq0JHYBg`} target="_blank"><img  src={Google}/></a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Wordcard
