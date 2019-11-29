import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Select from 'react-select';

const ButtonsContainer = styled.div `
    display: flex;
    float: right;
    margin: 20px 20px;
`;

export default class AddPokemon extends Component {
    state = {
        typesUrl: 'https://pokeapi.co/api/v2/type/',
        habitatsUrl: 'https://pokeapi.co/api/v2/pokemon-habitat/',
        eggsUrl: 'https://pokeapi.co/api/v2/egg-group',
        allPokemonsUrl: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=964',
        dropdownTypes: [{
            value: null,
            label: null
        }],
        dropdownHabitats: [{
            value: null,
            label: null
        }],
        dropdownEggs: [{
            value: null,
            label: null
        }],
        // Add new Pokemon states
        new_pokemon_name: '',
        new_pokemon_types: [],
        new_pokemon_hp: '',
        new_pokemon_attack: '',
        new_pokemon_defense: '',
    };

    async componentDidMount() {        
        // fetch types, habitats, egg groups
        let tempTypes, tempHabitats, tempEggs
        let typesArr = []
        let habitatsArr = []
        let eggsArr = []

        const types = await axios.get(this.state.typesUrl);
        tempTypes = types.data['results']
        // map types for dropdown
        tempTypes.map(type =>(
            typesArr.push({
                value: type.name,
                label: type.name,		
            })	
        ))

        const habitats = await axios.get(this.state.habitatsUrl);
        tempHabitats = habitats.data['results']
        // map habitats for dropdown
        tempHabitats.map(habitat =>(
            habitatsArr.push({
                value: habitat.name,
                label: habitat.name,		
            })	
        ))

        const egg_groups = await axios.get(this.state.eggsUrl);
        tempEggs = egg_groups.data['results']
        // map eggs for dropdown
        tempEggs.map(egg =>(
            eggsArr.push({
                value: egg.name,
                label: egg.name,		
            })	
        ))

        this.setState({
            dropdownTypes: typesArr,
            dropdownHabitats: habitatsArr,
            dropdownEggs: eggsArr
        });
    }
    
    onSave = () => {
        console.log(this.state.new_pokemon_hp)
    }

    setPokemonName(e) {
        this.setState({new_pokemon_name: e});
    }

    setPokemonTypes = new_pokemon_types => {
        this.setState({new_pokemon_types});
    }

    setPokemonHP(e) {
        this.setState({new_pokemon_hp: e});
    }

    setPokemonAttack(e) {
        this.setState({new_pokemon_attack: e});
    }

    setPokemonDefense(e) {
        this.setState({new_pokemon_defense: e});
    }

    render() {
        return (
            <div>   
            <Container>
                <div>          
                    <h5 className="mt-5 mx-auto">Add new Pokemon</h5>
                </div>
                <InputGroup className="mb-3">
                    <Row>
                        <Col lg={true}>
                            <Form.Control
                                className="input-form"
                                placeholder="Pokemon name"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_name}
                                onChange={e => this.setPokemonName(e.target.value)}
                            />
                        </Col>
                        <Col lg={true}>
                            <Select
                                className="input-form"
                                placeholder="select types"
                                value={this.state.new_pokemon_types}
                                onChange={this.setPokemonTypes}
                                options={this.state.dropdownTypes}
                                isMulti isSearchable
                            />
                        </Col>
                    </Row>
                    <div>          
                        <h5 className="mt-5 mx-auto">Stats</h5>
                    </div>
                    <Row>
                        <Col lg={true}>
                            <Form.Control
                                className="input-form"
                                placeholder="HP"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_hp}
                                onChange={e => this.setPokemonHP(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="attack"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_attack}
                                onChange={e => this.setPokemonAttack(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="defense"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_defense}
                                onChange={e => this.setPokemonDefense(e.target.value)}
                            />
                        </Col>
                        <Col lg={true}>
                            <Form.Control
                                className="input-form"
                                placeholder="speed"
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="special attack"
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="special defense"
                                aria-describedby="basic-addon1"
                            />
                        </Col>
                    </Row>
                    <div>          
                        <h5 className="mt-5 mx-auto">Others</h5>
                    </div>
                    <Row>
                        <Col lg={true}>
                            <Form.Control
                                className="input-form"
                                placeholder="height"
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="weight"
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="base experience"
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="base happiness"
                                aria-describedby="basic-addon1"
                            />
                        </Col>
                        <Col lg={true}>
                            <Form.Control
                                className="input-form"
                                placeholder="capture rate"
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="abilities"
                                aria-describedby="basic-addon1"
                            />
                            <Select
                                className="input-form"
                                placeholder="select habitat"
                            //   value={selectedOption}
                            //   onChange={this.handleChange}
                            options={this.state.dropdownHabitats}
                            isSearchable 
                            />
                            <Select
                                className="input-form"
                                placeholder="select egg groups"
                            //   value={selectedOption}
                            //   onChange={this.handleChange}
                            options={this.state.dropdownEggs}
                            isMulti isSearchable 
                            />
                        </Col>
                    </Row>
                </InputGroup>
                <ButtonsContainer>
                    <Link to="/">
                        <Button variant="secondary" >
                            Cancel
                        </Button>
                    </Link>
                    <Button variant="success" onClick={this.onSave} >Save</Button>
                </ButtonsContainer>
            </Container>
                
            </div>
        )
    }
}
