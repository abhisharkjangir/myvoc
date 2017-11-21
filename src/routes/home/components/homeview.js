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
import FontAwesome  from 'react-fontawesome'

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
      if (randomWords && randomWords.list && randomWords.date && Moment(new Date()).format("DDMMYYYY") == Moment(randomWords.date).format("DDMMYYYY")) {
        this.props.fetchAndSaveRandomWords({list : randomWords.list, date : randomWords.date})
        this.props.setQuestionLimit(ql)
      } else {
        this.fetchRandomWords(ql)
      }
    }
  }

  // Fetch Ramdom Words From 'API'
  fetchRandomWords(ql) {
    return fetch(`http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&limit=${ql}&api_key=8e374b170c872d41579010bbfcc05e4eaa89810a052641153`, {mode: 'cors'}).then((response) => {
      response.json().then(words => {
        let date = new Date()
        this.props.fetchAndSaveRandomWords({list : words, date : date })
        localStorage.setItem("randomWords",JSON.stringify({list : words,date : date}))
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
    fetch(`http://api.wordnik.com:80/v4/words.json/search/${query}?caseSensitive=false&api_key=8e374b170c872d41579010bbfcc05e4eaa89810a052641153`)
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
              <div className="app-intro-content  animate-bottom">
                <h2>Word Book</h2>
                <p>learn & save new words daily.</p>
                <AsyncTypeahead className="async-typeahead"
                  {...this.state}
                  labelKey="word"
                  onSearch={this._handleSearch}
                  onChange={this._handleChange}
                  placeholder="Search any word..."
                  renderMenuItemChildren={this._renderMenuItemChildren}
                />
                <h5>coming soon on</h5>
                <p><FontAwesome name="android" size="3x"/></p>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-8 padding-0">
            {!this.props.home.home.isLimitSet && <div className="onboarding-container">
              <h2 className="text-center">Choose daily word limit</h2>
              <Onboarding  isLimitSet={!this.props.home.home.isLimitSet} questions={this.props.home.home.questionLimit} setQueLimitFn={this.props.setQuestionLimit}/>
              <div className={this.props.home.home.questionLimit?'visible' : 'invisible'}>
                <button className="button button--size-s button--saqui button--inverted button--text-upper button--text-small button--round-s" onClick={this.setQuestionLimitInCookie} data-text="continue">continue <i className="fa fa-long-arrow-right" ></i></button>
              </div>
            </div>}
            {this.props.home.home.randomWords && <div className="random-word-container">
                <h3>Let's learn, {this.props.home.home.questionLimit} random words</h3>
                <Wordlist words={this.props.home.home.randomWords.list}/>
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
