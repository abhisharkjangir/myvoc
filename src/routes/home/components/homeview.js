import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './homeview.scss'
import logo from './logo.png'
import android from './android.png'
import Checkbox from '../../../components/common/checkbox/checkbox'
import Wordcard from '../../../components/common/wordcard/wordcard'

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

  render() {
    return (<div className="home-view">
      <div className="box">
        <span className="overlay">
          <img src={logo} width="100"/>
          <h1>Hey you!</h1>
          <h3>You feel lost?</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          <ul>
            <li>Search words</li>
            <li>Learn New Words</li>
            <li>Play Word Quiz</li>
          </ul>
          <p>coming soon</p>
          <img src={android} width="100"/>
        </span>
      </div>
      {}
      <div className="box">
        {!this.props.home.home.isLimitSet &&
          <div className="onboarding">
            <h2 >How many words you want to learn daily?</h2>
            <div className="flex">
              {wordLimit.map(i => <Checkbox key={i.id} value={i.value} checked={i.value == this.props.home.home.questionLimit} toggle={this.props.setQuestionLimit}/>)}
            </div>
            {this.props.home.home.questionLimit && <button className="button button--size-m button--saqui button--inverted button--text-upper button--text-medium button--border-thick button--round-l" onClick={this.setQuestionLimitInCookie} data-text="continue">continue</button>}
          </div>}
          {this.props.home.home.randomWords && <div className="word-list">
            {this.props.home.home.randomWords.map(w => <Wordcard key={w.id} word={w.word}/>)}
          </div>}

      </div>
    </div>)
  }
}

Home.propTypes = {
  home: PropTypes.object,
  questionLimit: PropTypes.func
}

export default Home
