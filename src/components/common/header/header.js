import React,{ Component } from 'react'
import {IndexLink, Link} from 'react-router'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import './header.scss'
import logo from './logo.png'
import FontAwesome  from 'react-fontawesome'

class Header extends Component{
  constructor(){
    super()
  }

  goToUrl (url){
    this.props.history.push(url);
  }

  render(){
    return (
      <div>
        <Navbar fluid collapseOnSelect fixedTop className={this.props.hclass}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#/"><img src={logo} width="85"/></a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={() => this.goToUrl('random')}><FontAwesome name='random'/> Random</NavItem>
              <NavItem eventKey={2} onClick={() => this.goToUrl('search')}><FontAwesome name='search'/> Search</NavItem>
              <NavItem eventKey={3} onClick={() => this.goToUrl('saved')}><FontAwesome name='book'/> Word Book</NavItem>
              <NavItem eventKey={4} onClick={() => this.goToUrl('setting')} ><FontAwesome name='gears'/> Settings</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header
