import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './search.scss'
import Wordcard from '../../../components/common/wordcard/wordcard'
import Loader from '../../../components/common/loader'
// import Dic from './dictionary.json'

const debounce = (func, delay) => {
  let inDebounce = undefined;
  return function() {
    let context = this,
      args = arguments;
    clearTimeout(inDebounce);
    return inDebounce = setTimeout(function() {
      return func.apply(context, args);
    }, delay);
  }
}

export class Search extends Component {
  constructor() {
    super()
    this.state = {
      words : [],q : undefined, isSearching : false
    }
    this.fetchWords = this.fetchWords.bind(this)
    this.debounceSearch = this.debounceSearch.bind(this)
  }

  componentWillMount() {
    this.handleSearchDebounced = debounce(this.fetchWords, 500);
    if(this.props.location.query.q){
      this.setState({q : this.props.location.query.q})
      this.handleSearchDebounced()
    }
  }

  debounceSearch(e){
    let q = e.target.value
    this.setState({q : q})
    this.handleSearchDebounced()
  }

  fetchWords(){
    if(!this.state.q || this.state.q == '') {
      this.setState({isSearching : false,q : undefined,words : []})
      return
    }
    this.props.location.query = {q : this.state.q}
    let fake = this
    fake.setState({isSearching : true,words : []})
    fetch(`http://api.wordnik.com:80/v4/words.json/search/${fake.state.q}?caseSensitive=false&api_key=8e374b170c872d41579010bbfcc05e4eaa89810a052641153`)
    .then(resp => resp.json())
    .then(json =>this.setState({words: json.searchResults,isSearching : false}))
  }

  // JSON FORMATTER
  // format = () => {
  //   let json = Dic;
  //   let keys = Object.keys(json)
  //   let newjson = keys.map(key => {
  //     let ob = {
  //       id : key.toLowerCase(),
  //       word : key.toLowerCase(),
  //       definition : json[key]
  //     }
  //     return JSON.stringify(ob)
  //   })
  // }

  render() {
    return (
    <div className="container-fluid search">
      <div className="row text-center search-bar">
        <input type="text" name="search" placeholder="Let's search..." value={this.state.q} className="form-control" onChange={this.debounceSearch}/>
      </div>
      <div className="row">
        <div className="search-result animate-bottom">
          {this.state.isSearching && <Loader />}
          {!this.state.isSearching && this.state.words.length == 0 && <h3>Let's start exploring</h3> }
          {this.state.words.length > 0 && this.state.words.map(w => <Wordcard key={w.word} word={w.word}/>)}
        </div>
      </div>
    </div>)
  }
}

Search.propTypes = {

}

export default Search
