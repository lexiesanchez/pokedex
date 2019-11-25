import React, { Component } from 'react'
import axios from 'axios';
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
    state = {
        url: 'https://pokeapi.co/api/v2/type/',
        types: [],
        selectedType: null
    };

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({
            types: res.data['results'],
        });
    }

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
                                {this.state.selectedType ? (this.state.selectedType) : ('Select Type')} 
                            </Dropdown.Toggle>
                            {this.state.types ? 
                                (<Dropdown.Menu>
                                    {this.state.types.map(type => (
                                        <Dropdown.Item 
                                            eventKey={type.name}>
                                                {type.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>) : (null)}
                        </Dropdown>
                        </Row>
                    </GroupContainer>
                </InputGroup>
            </div>
        )
    }
}