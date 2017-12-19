import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './saved.scss'
import {Media} from 'react-bootstrap'
import Google from './search.png'
import pin from './tack-save-button.png'
import pinned from './saved.png'
import FontAwesome  from 'react-fontawesome'
import Confirmation from '../../../components/common/confirmation/confirmation'

export class Saved extends Component {
  constructor() {
    super()
    this.state = {
      savedWords: [],
      modalOpen : false
    }
    this.removeWordFromSaved = this.removeWordFromSaved.bind(this)
    this.openConfirmation = this.openConfirmation.bind(this)
    this.closeConfirmation = this.closeConfirmation.bind(this)
    this.clearWords = this.clearWords.bind(this)
  }

  componentWillMount() {
    if(localStorage.getItem('savedWords')){
      let sw = JSON.parse(localStorage.getItem('savedWords'))
      if (sw) {
        this.setState({savedWords: sw})
      }
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

  openConfirmation(){
    this.setState({modalOpen : true})
  }

  closeConfirmation(){
    this.setState({modalOpen : false})
  }

  clearWords(){
    localStorage.setItem('savedWords',[])
    this.setState({modalOpen : false,savedWords : []})
  }

  render() {
    return (<div>
      <div className="container-fluid">
        <div className="row">
          <div className="wordbook-header">
            <h2 className="text-center"><FontAwesome name="book"/> Word Book</h2>
          </div>
          {this.state.savedWords.length > 0 && <div className="wordbook-subheader">
            <span>Total Words : {this.state.savedWords.length}</span>
            <span onClick={this.openConfirmation}><FontAwesome name="trash"/>Delete All</span>
            <Confirmation
              open={this.state.modalOpen}
              close={this.closeConfirmation}
              yes={this.clearWords}
              no={this.closeConfirmation}
              title="Delete Confirmation"
              body="Do you want to clear all words?"
              yesBtnLabel="Yes"
              noBtnLabel="No"
            />
          </div>}
        </div>
        <div className="row">
          <div className="wordbook-body animate-bottom">
            {this.state.savedWords.length == 0 &&
              <div>
                <h3 className="text-center"><FontAwesome name="book" size="3x"/></h3>
                <h4 className="text-center">Your word book is empty!</h4>
                <h4 className="text-center">Start exploring!</h4>
              </div>
            }
            <div className="saved animate-bottom">
              {this.state.savedWords.length > 0 && this.state.savedWords.map(w => <Savedcard word={w} key={w.id} removeWordFn={this.removeWordFromSaved}/>)}
            </div>
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
              <li><i className="fa fa-heart fa-2x cursor" onClick={() => props.removeWordFn(props.word.engWord)} ></i></li>
              <li><a href={`https://www.google.co.in/search?q=${props.word.engWord}&gws_rd=cr&dcr=0&ei=uYf9WYy3CszOvgTq0JHYBg`} target="_blank"><i className="fa fa-google fa-2x"></i></a></li>
            </ul>
          </div>
        </Media.Body>
      </Media>
    </div>
  </div>
)

export default Saved
