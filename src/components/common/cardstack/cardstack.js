import React, {Component} from 'react'
import './cardstack.scss'
import FontAwesome from 'react-fontawesome'
import Cards, {Card} from 'react-swipe-card'

class Cardstack extends Component {
  constructor() {
    super()
    this.state = {
      stack: undefined,
      words: [],
      count : 1,
      nolist : [],
      yeslist : [],
      currentwordindex : undefined
    }
    this.Reject = this.Reject.bind(this)
    this.Accept = this.Accept.bind(this)
    this.onEndStack = this.onEndStack.bind(this)
  }

  componentWillMount() {
    this.setState({words: this.props.words, currentwordindex : 0})
  }

  componentDidMount() {
    let stack_quiz = new Stack(document.getElementById('stack_krisna'))
    // stack_quiz.options.visible = 5;
    stack_quiz.options.infinite = false;
    stack_quiz.options.onEndStack = this.onEndStack
    this.setState({
      stack: stack_quiz
    })
  }

  onEndStack(){
    this.props.onEndStackFn(this.state.yeslist.length, this.state.nolist.length)
  }

  Reject() {
    let fakestate = this.state
    fakestate.count +=1
    fakestate.nolist.push(fakestate.words[fakestate.currentwordindex])
    fakestate.currentwordindex++
    this.setState({count : fakestate.count,currentwordindex :  fakestate.currentwordindex, nolist : fakestate.nolist})
    fakestate.stack.reject()
  }

  Accept() {
    let fakestate = this.state
    fakestate.count+=1
    fakestate.yeslist.push(fakestate.words[fakestate.currentwordindex])
    fakestate.currentwordindex++
    this.setState({count : fakestate.count,currentwordindex :  fakestate.currentwordindex, yeslist : fakestate.yeslist})
    fakestate.stack.accept()
  }

  render() {
    return (<div className="stack-container animate-top">
      <ul id="stack_krisna" className="stack stack--krisna">
        {this.state.words && this.state.words.map((word, i) => <li key={i} className="stack__item">
          <div style={{ background : `${word.color}`}}>
            { <p className="ques-no">
              <span>{i+1}</span>
              <span className="divider"> of </span>
              <span>{this.state.words.length}</span>
            </p>}
            <p>{word.word}</p>
          </div>
        </li>)}
      </ul>
      <div className="controls">
        <div>
          <h3>Do you know?</h3>
          <button className="button button--size-s button--saqui button--inverted button--text-upper button--text-small button--round-s" onClick={this.Reject} data-text="No">
            No <i className="fa fa-close"></i>
          </button>
          <button className="button button--size-s button--saqui button--inverted button--text-upper button--text-small button--round-s" onClick={this.Accept} data-text="Yes">
            Yes <i className="fa fa-check"></i>
          </button>
        </div>
      </div>
    </div>)
  }
}

export default Cardstack
