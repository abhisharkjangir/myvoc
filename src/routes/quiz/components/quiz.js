import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './quiz.scss'
import Cardstack from '../../../components/common/cardstack/cardstack'
import FontAwesome  from 'react-fontawesome'
import Loader from '../../../components/common/loader'
import {hashHistory } from 'react-router'


const randomColorGenerator = () => {
  let myColors = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
  let cutIn= 0;
  let myRandone = myColors[Math.floor(Math.random() * myColors.length)];
  let myRandtwo = myColors[Math.floor(Math.random() * myColors.length)];
  let myRandthree = myColors[Math.floor(Math.random() * myColors.length)];
  let myRandfour = myColors[Math.floor(Math.random() * myColors.length)];
  let myRandfive = myColors[Math.floor(Math.random() * myColors.length)];
  let myRandsix = myColors[Math.floor(Math.random() * myColors.length)];
  return '#' + myRandone + myRandtwo + myRandthree + myRandfour + myRandfive + myRandsix;
}

const hex2rgba = (hex,opacity) =>{
  opacity = opacity || 1
  hex = hex.replace('#','');
  let r = parseInt(hex.substring(0, hex.length/3), 16);
  let g = parseInt(hex.substring(hex.length/3, 2*hex.length/3), 16);
  let b = parseInt(hex.substring(2*hex.length/3, 3*hex.length/3), 16);
  return `rgba(${r},${g},${b},${opacity})`
}

export class Quiz extends Component {
  constructor() {
    super()
    this.state = {
      quizwords : [],
      isLoading : false,
      showquiz : false,
      isQuizDone : false,
      wordYouKnow : undefined,
      wordYouDontKnow : undefined
    }
    this.fetchQuizWords = this.fetchQuizWords.bind(this)
    this.showResult = this.showResult.bind(this)
    this.goToHome = this.goToHome.bind(this)
    this.playAgain = this.playAgain.bind(this)
  }

  componentWillMount() {
    // this.fetchQuizWords()
  }

  fetchQuizWords(){
    this.setState({isLoading : true})
    fetch(`https://imabhi.herokuapp.com/randomwords/10`)
    .then(res => res.json())
    .then(r => {
      let coloredWords = r.data.map(w => {
        let color1= hex2rgba(randomColorGenerator(),0.7)
        let color2 = hex2rgba(randomColorGenerator(),0.7)
          w.color = `linear-gradient(to right, ${color1}, ${color2})`
          return w
       })
      this.setState({isLoading : false ,quizwords : coloredWords, showquiz : true})
    })
  }

  showResult(yes,no){
    this.setState({isQuizDone : true, wordYouKnow : yes, wordYouDontKnow : no})
  }

  goToHome(){
    hashHistory.push(`random`)
  }

  playAgain(){
    this.setState({
      quizwords : [],
      isLoading : true,
      showquiz : false,
      isQuizDone : false,
      wordYouKnow : undefined,
      wordYouDontKnow : undefined
    })
    this.fetchQuizWords()
  }

  render() {
    return (
      <div className="quiz">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {!this.state.isLoading && this.state.quizwords.length == 0 &&  <div className="quiz-intro animate-left">
                <h3>How strong is your vocabulary?</h3><br/>
                {/* <h4>You'll have 10 seconds to answer each question. The faster you answer, the higher your score. The harder the question, the higher your score.</h4> */}
                <button
                  className="button button--size-s button--saqui button--inverted button--text-upper button--text-small button--round-s"
                  data-text="Start the Quiz"
                  onClick={this.fetchQuizWords}>Start the Quiz <i className="fa fa-long-arrow-right"></i>
                </button>
              </div>}
              <div className="quiz-test animate-left">
                { this.state.isLoading && <Loader  />}
                {!this.state.isLoading && this.state.quizwords.length > 0 && !this.state.isQuizDone &&
                  <div>
                    <Cardstack className="animate-left" onEndStackFn={this.showResult} words={this.state.quizwords} />
                  </div>
                }
                {
                  this.state.isQuizDone &&
                  <div className="animate-bottom">
                    <div className="quiz-res-container ">
                      <div className="quiz-res">
                        <div className="quiz-res__item">
                          <div style={{ background : `linear-gradient(to right, ${hex2rgba(randomColorGenerator(),0.7)}, ${hex2rgba(randomColorGenerator(),0.7)})`}}>
                            <p>You scored {this.state.wordYouKnow/this.state.quizwords.length*100}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="button button--size-s button--saqui button--inverted button--text-upper button--text-small button--round-s"
                      data-text="Play"
                      onClick={this.playAgain}
                      >
                          <i className="fa fa-undo "></i>
                    </button>
                    <button className="button button--size-s button--saqui button--inverted button--text-upper button--text-small button--round-s" onClick={this.goToHome} data-text="Home">
                       <i className="fa fa-home"></i>
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Quiz.propTypes = {

}

export default Quiz
