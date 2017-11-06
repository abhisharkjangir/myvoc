import React from 'react'
import './checkbox.scss'
import Tick from './tick.png'

const Checkbox = (props) => (
  <div className="check-box" onClick={()=> props.toggle(props.value)}>
    {props.value}
    {props.checked && <div className="checkbox-overlay">
      <img src={Tick} width="40"/><br/>
      {props.value}
    </div>}
  </div>
)

export default Checkbox
