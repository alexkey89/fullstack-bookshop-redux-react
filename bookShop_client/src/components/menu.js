import React, {Component} from 'react';
import {Row, Col, Navbar, Nav, NavItem, Badge} from 'react-bootstrap';

export default class Menu extends Component{
    render(){
        return(
    <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
        <Navbar.Brand>
            <a href="/">Home</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contact">Contact Us</NavItem>
        </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="/admin">Admin</NavItem>
        <NavItem eventKey={2} href="/cart">Your Cart
            { 
            (this.props.cartItemsNumber > 0) ? 
                (<Badge className="badge">{this.props.cartItemsNumber}</Badge>)
                :('')
            }
          </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
        )
    }
}
