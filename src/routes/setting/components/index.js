import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import './setting.scss'
import FontAwesome  from 'react-fontawesome'


export class Setting extends Component {
  constructor() {
    super()
    this.state = {
      words : [],q : undefined, isSearching : false
    }
  }

  componentWillMount() {

  }


  render() {
    return (
    <div className="container-fluid">
      <div className="setting">
        <div className="row">
          <div className="col-md-12 p-r-0 p-l-0">
            <div className="setting-bar">
              <h2 className="text-center"><FontAwesome name="gears" /> Setting</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-r-0 p-l-0">
            <div className="setting-body">
              <div className="setting-card">
                <div className="setting-card-header">
                  <FontAwesome name="book" /> Word Book
                </div>
                <div className="setting-card-body">
                  Do you want to clear your word book?
                </div>
                <div className="setting-card-footer">
                  <span><FontAwesome name="trash" /> clear</span>
                </div>
              </div>
              <div className="setting-card">
                <div className="setting-card-header">
                  <FontAwesome name="book" /> Word Limit
                </div>
                <div className="setting-card-body">
                  Do you want to change your daily words limit?
                </div>
                <div className="setting-card-footer">
                  <span><FontAwesome name="thumbs-up" /> Yes</span>
                </div>
              </div>
              <div className="setting-card">
                <div className="setting-card-header">
                  <FontAwesome name="book" /> Reset App
                </div>
                <div className="setting-card-body">
                  Do You want to reset the app? By resetting app, your word book and question limit will also be reset.
                </div>
                <div className="setting-card-footer">
                  <span><FontAwesome name="thumbs-up" /> Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

Setting.propTypes = {

}

export default Setting
