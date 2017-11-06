import React from 'react'
import './loader.scss'

const Loader = (props) => (
  <div className="loading">
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <p>Loading...</p>
  </div>
)

export default Loader
