import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
export default class NavBar extends Component {

    render() {
        return (
            <div className="main">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>Pokedex</Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}