import React from 'react'
import { browserHistory, Router,hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './common/header/header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Header hclass="black-header" history={hashHistory}/>
          <Router history={hashHistory} children={this.props.routes} />
        </div>
      </Provider>
    )
  }
}

export default App
