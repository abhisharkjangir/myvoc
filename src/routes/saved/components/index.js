import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './saved.scss'
import {Media} from 'react-bootstrap'
import Google from './search.png'
import pin from './tack-save-button.png'
import pinned from './saved.png'


export class Saved extends Component {
  constructor() {
    super()
    this.state = {
      savedWords: []
    }
    this.removeWordFromSaved = this.removeWordFromSaved.bind(this)
  }

  componentWillMount() {
    let sw = JSON.parse(localStorage.getItem('savedWords'))
    if (sw) {
      this.setState({savedWords: sw})
    }
  }

  removeWordFromSaved(word){
    let savedWords = this.state.savedWords
    let wordIndex = savedWords.findIndex(function(w){
       return w.id == word;
     })
     if (wordIndex === -1) {
       alert("Word doesn't exist!")
       return
     }
     savedWords.splice(wordIndex, 1);
     localStorage.setItem("savedWords",JSON.stringify(savedWords))
     this.setState({"savedWords" : savedWords})
  }

  render() {
    return (<div>
      <div className="container-fluid">
        <div className="row">
          {this.state.savedWords.length == 0 && <h3 className="text-center">No word saved yet</h3>}
          {this.state.savedWords.length > 0 && <h3 className="text-center">Saved Words ({this.state.savedWords.length})</h3>}
        </div>
        <div className="row">
          <div className="saved animate-bottom">
            {this.state.savedWords.length > 0 && this.state.savedWords.map(w => <Savedcard word={w} key={w.id} removeWordFn={this.removeWordFromSaved}/>)}
          </div>
        </div>
      </div>
    </div>)
  }
}

Saved.propTypes = {

}

const Savedcard = (props) => (
  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 saved-container" >
    <div className="saved-card">
      <Media className="">
        <Media.Left align="top">
          <div className="card-title">{props.word.engWord.charAt(0)}</div>
        </Media.Left>
        <Media.Body>
          <Media.Heading>{props.word.engWord}</Media.Heading>
          <p>{props.word.hindiMeaning}</p>
          <p>{props.word.engDef}</p>
          <p>{props.word.hindiDef}</p>
          <div className="word-action">
            <ul>
              <li><img src={pinned} onClick={() => props.removeWordFn(props.word.engWord)} /></li>
              <li><a href={`https://www.google.co.in/search?q=${props.word.engWord}&gws_rd=cr&dcr=0&ei=uYf9WYy3CszOvgTq0JHYBg`} target="_blank"><img  src={Google}/></a></li>
            </ul>
          </div>
        </Media.Body>
      </Media>
    </div>
  </div>
)

export default Saved
