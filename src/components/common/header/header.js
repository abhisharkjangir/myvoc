import React,{ Component } from 'react'
import {IndexLink, Link} from 'react-router'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import './header.scss'
import logo from './logo.png'

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
        <Navbar collapseOnSelect fixedTop className={this.props.hclass}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#/"><img src={logo} width="75"/></a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem  eventKey={1} onClick={() => this.goToUrl('random')}>Random</NavItem>
              <NavItem  eventKey={2} onClick={() => this.goToUrl('search')}>Search</NavItem>
              <NavItem  eventKey={3} onClick={() => this.goToUrl('saved')}>Word Book</NavItem>
              {/* <NavItem  eventKey={4} onClick={() => this.goToUrl('quiz')} >Play Word Quiz</NavItem> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

// export const Header = (props) => {
//   const goToUrl = (url) => {
//     props.history.push(url);
//   }
//   return (<div>
//     <Navbar collapseOnSelect fixedTop className={props.hclass}>
//       <Navbar.Header>
//         <Navbar.Brand>
//           <a href="#/"><img src={logo} width="75"/></a>
//         </Navbar.Brand>
//         <Navbar.Toggle/>
//       </Navbar.Header>
//       <Navbar.Collapse>
//         <Nav pullRight>
//           <NavItem  eventKey={1} onClick={() => goToUrl('random')}>Random Words</NavItem>
//           <NavItem  eventKey={2} onClick={() => goToUrl('search')}>Search Words</NavItem>
//           <NavItem  eventKey={3} onClick={() => goToUrl('saved')}>Saved Words</NavItem>
//           <NavItem  eventKey={4} onClick={() => goToUrl('quiz')} >Play Word Quiz</NavItem>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   </div>)
// }

export default Header
