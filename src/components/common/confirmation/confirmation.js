import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal,Button} from 'react-bootstrap'
import './confirmation.scss'
class Confirmation extends Component{
  constructor(){
    super()
  }

  render(){
    return (
      <Modal dialogClassName="confirmation" show={this.props.open} onHide={this.props.close} bsSize="sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.yes} bsStyle="primary" bsSize="sm">{this.props.yesBtnLabel}</Button>
          <Button onClick={this.props.no} bsSize="sm">{this.props.noBtnLabel}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Confirmation
