import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './homeview.scss'
import logo from './logo.png'
import android from './android.png'
import Checkbox from '../../../components/common/checkbox/checkbox'
import Wordcard from '../../../components/common/wordcard/wordcard'
import {FormGroup, InputGroup, Button, FormControl} from 'react-bootstrap'
import {asyncContainer,AsyncTypeahead, Typeahead} from 'react-bootstrap-typeahead';
import {hashHistory } from 'react-router'

const wordLimit = [
  {
    id: 1,
    value: 5,
    check: true
  }, {
    id: 2,
    value: 10,
    check: false
  }, {
    id: 3,
    value: 15,
    check: false
  }, {
    id: 4,
    value: 20,
    check: false
  }
]

export class Home extends Component {
  constructor() {
    super()
    this.state = {
      options: []
    };
    this.setQuestionLimitInCookie = this.setQuestionLimitInCookie.bind(this)
    this.fetchRandomWords = this.fetchRandomWords.bind(this)
    this.updateComponent = this.updateComponent.bind(this)
  }

  componentWillMount() {
    this.updateComponent()
  }

  updateComponent(){
    let ql = localStorage.getItem("questionLimit")
    if (ql) {
      this.props.setLimitStatus()
      let randomWords = JSON.parse(localStorage.getItem("randomWords"))
      if (randomWords && Moment(new Date()).format("DDMMYYYY") == Moment(randomWords.date).format("DDMMYYYY")) {
        this.props.fetchAndSaveRandomWords(randomWords)
        this.props.setQuestionLimit(ql)
      } else {
        this.fetchRandomWords(ql)
      }
    }
  }

  // Fetch Ramdom Words From 'API'
  fetchRandomWords(ql) {
    return fetch(`http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=${ql}&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`, {mode: 'cors'}).then((response) => {
      response.json().then(words => {
        words.date = new Date()
        this.props.fetchAndSaveRandomWords(words)
        localStorage.setItem("randomWords",JSON.stringify(words))
      })
    }).catch(error => {
      throw(error);
    })
  }

  // Set the Question limit in Cookie or LocalStorage
  setQuestionLimitInCookie() {
    localStorage.setItem("questionLimit", this.props.home.home.questionLimit)
    this.props.setLimitStatus()
    this.fetchRandomWords(this.props.home.home.questionLimit)
  }

  _renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.word}>
        <span>{option.word}</span>
      </div>
    );
  }

  _handleSearch = query => {
    if (!query) return
    fetch(`http://api.wordnik.com:80/v4/words.json/search/${query}?caseSensitive=true&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&skip=0&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
    .then(resp => resp.json())
    .then(json => this.setState({options: json.searchResults}));
  }

  _handleChange = e => {
    let selectedQuery = e[0].word
    hashHistory.push(`search?q=${selectedQuery}`)
  }

  render() {
    return (
      <div  className="container-fluid p-l-0 p-r-0">
        <div className="row margin-0">
          <div className="col-md-4 col-lg-4 padding-0">
            <div className="app-intro">
              <div className="app-intro-content">
                <AsyncTypeahead className="async-typeahead animate-bottom"
                  {...this.state}
                  labelKey="word"
                  onSearch={this._handleSearch}
                  onChange={this._handleChange}
                  placeholder="Search any word..."
                  renderMenuItemChildren={this._renderMenuItemChildren}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-8 padding-0">
            {!this.props.home.home.isLimitSet && <div className="onboarding-container">
              <h2 className="text-center">How many words you want to learn daily?</h2>
              <Onboarding  isLimitSet={!this.props.home.home.isLimitSet} questions={this.props.home.home.questionLimit} setQueLimitFn={this.props.setQuestionLimit}/>
              <div className={this.props.home.home.questionLimit?'visible' : 'invisible'}>
                <button className="button button--size-s button--saqui button--inverted button--text-upper button--text-medium button--border-thick button--round-l" onClick={this.setQuestionLimitInCookie} data-text="continue">continue</button>
              </div>
            </div>}
            {this.props.home.home.randomWords && <div className="random-word-container">
                <h3>Let's learn, {this.props.home.home.questionLimit} random words</h3>
                <Wordlist words={this.props.home.home.randomWords}/>
            </div>}
          </div>
        </div>
      </div>
      )
  }
}

const Onboarding = (props) => (
  <div className="onboarding animate-bottom">
    {wordLimit.map(i => <Checkbox key={i.id} value={i.value} checked={i.value == props.questions} toggle={props.setQueLimitFn}/>)}
  </div>
)

const Wordlist = (props) => (
  <div className="random-words animate-bottom">
    {props.words.map(w =>
      <Wordcard key={w.id} word={w.word} />
    )}
  </div>
)

Home.propTypes = {
  home: PropTypes.object,
  questionLimit: PropTypes.func
}

export default Home
