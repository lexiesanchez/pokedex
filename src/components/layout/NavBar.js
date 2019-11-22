import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const GroupContainer = styled.div `
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

export default class NavBar extends Component {
    render() {
        return (
            <div className="main">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>Pokedex</Navbar.Brand>
                </Navbar>
                <InputGroup className="filters">
                    <GroupContainer>
                        <Row>
                        <Form.Control className="searchbar" type="text" placeholder="Search Pokemon"/>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown">
                                Select Type
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Electric</Dropdown.Item>
                                <Dropdown.Item>Grass</Dropdown.Item>
                                <Dropdown.Item>Water</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Row>
                    </GroupContainer>
                </InputGroup>
            </div>
        )
    }
}