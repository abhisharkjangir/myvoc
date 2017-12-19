import React,{ Component  } from 'react'
import './wordcard.scss'
import Google from './search.png'
import Save from './tack-save-button.png'
import Saved from './saved.png'

const MONGOFIND_BY_ID = (arr, id) => {
  return arr.filter(function(x) {
    return x.id == id;
  }).shift();
}

class Wordcard extends Component {
  constructor() {
    super()
    this.state = {
      definition : {},
      hindiDefinition : '',
      hindiMeaning :'',
      isSaved : false,
      isLoading : false
    }
    this.fetchWordDefination = this.fetchWordDefination.bind(this)
    this.gTranslator = this.gTranslator.bind(this)
    this.saveWord = this.saveWord.bind(this)
    this.isWordSaved = this.isWordSaved.bind(this)
    this.removeWordFromSaved = this.removeWordFromSaved.bind(this)
  }

  componentWillMount(){
    this.isWordSaved()
    this.fetchWordDefination()
  }

  isWordSaved(){
    if(localStorage.getItem("savedWords")){
      let savedWords = JSON.parse(localStorage.getItem("savedWords"))
      if(MONGOFIND_BY_ID(savedWords,this.props.word)){this.setState({isSaved : true})}
    }
  }

  gTranslator(engWord, engDef){
    fetch(`https://imabhi.herokuapp.com/translator?pharse=${engWord}&def=${engDef}`).then((response) => {
      response.json().then(res => {
        this.setState({hindiDefinition : res.data.def,hindiMeaning : res.data.word,isLoading : false})
      })
    }).catch(error => {
      throw(error);
    })
  }

  fetchWordDefination(){
    this.setState({isLoading : true})
    fetch(`http://api.wordnik.com:80/v4/word.json/${this.props.word}/definitions?limit=200&includeRelated=true&sourceDictionaries=wiktionary&useCanonical=true&includeTags=false&api_key=8e374b170c872d41579010bbfcc05e4eaa89810a052641153`, {mode: 'cors'}).then((response) => {
      response.json().then(def => {
        if(def.length > 0){
          this.setState({definition : def[0]})
          this.gTranslator(this.props.word,def[0].text || this.props.word)
        }else {this.setState({definition : {}})
        this.gTranslator(this.props.word, this.props.word)}
      })
    }).catch(error => {
      throw(error);
    })
  }

  saveWord(){
    let word = {
      id : this.props.word,
      engWord : this.props.word,
      engDef : this.state.definition.text,
      hindiMeaning : this.state.hindiMeaning,
      hindiDef : this.state.hindiDefinition
    }
    if(!localStorage.getItem("savedWords")) localStorage.setItem("savedWords",JSON.stringify([]))
    let savedWords = JSON.parse(localStorage.getItem("savedWords"))
    if(MONGOFIND_BY_ID(savedWords,this.props.word)) {
      alert('Already saved!')
      return
    }else {
      savedWords.unshift(word)
      localStorage.setItem("savedWords",JSON.stringify(savedWords))
      this.setState({isSaved : true})
    }
  }

removeWordFromSaved(){
  let word = this.props.word
  let savedWords = JSON.parse(localStorage.getItem("savedWords"))
  let wordIndex = savedWords.findIndex(function(w){
     return w.id == word;
   })
   if (wordIndex === -1) {
     alert("Word doesn't exist!")
     return
   }
   savedWords.splice(wordIndex, 1);
   localStorage.setItem("savedWords",JSON.stringify(savedWords))
   this.setState({isSaved : false})
}

  render(){
    return (
      <div className="wordcard">
        <div className={this.state.isLoading ? ' word-title rotate' :'word-title'}>{this.props.word.charAt(0)}</div>
        <div className="word-desc">
          <h3>{this.props.word} {this.state.definition.partOfSpeech && <span>({this.state.definition.partOfSpeech})</span>}</h3>
          <h3>{this.state.hindiMeaning}</h3>
          <p>{this.state.definition.text}</p>
          <p>{this.state.hindiDefinition}</p>
          <div className="word-action">
            <ul>
              <li><i className={this.state.isSaved ? 'fa fa-heart fa-2x cursor' : 'fa fa-heart-o fa-2x cursor'} src={this.state.isSaved ? Saved : Save} onClick={this.state.isSaved ? this.removeWordFromSaved :this.saveWord}></i></li>
              <li><a href={`https://www.google.co.in/search?q=${this.props.word + " meaning in hindi"}&gws_rd=cr&dcr=0&ei=uYf9WYy3CszOvgTq0JHYBg`} target="_blank"><i className="fa fa-google fa-2x"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Wordcard
