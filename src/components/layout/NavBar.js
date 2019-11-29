import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
export default class NavBar extends Component {

    render() {
        return (
            <div className="main">
                <Navbar className="justify-content-center" bg="dark" expand="lg">
                    <Navbar.Brand className="brand">POKEDEX</Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}