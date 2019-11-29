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
import Modal from 'react-bootstrap/Modal'

const ButtonsContainer = styled.div `
    display: flex;
    float: right;
    margin: 20px 20px;
`;

function SaveSuccess(props) {
    return (
      <Modal {...props} size="sm" centered
        aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A new Pokemon has been registered to your Pokedex!
          </p>
        </Modal.Body>
      </Modal>
    );
}

export default class AddPokemon extends Component {
    state = {
        showModal: false,
        typesUrl: 'https://pokeapi.co/api/v2/type/',
        habitatsUrl: 'https://pokeapi.co/api/v2/pokemon-habitat/',
        eggsUrl: 'https://pokeapi.co/api/v2/egg-group',
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
        new_pokemon_speed: '',
        new_pokemon_specialAtk: '',
        new_pokemon_specialDef: '',
        new_pokemon_height: '',
        new_pokemon_weight: '',
        new_pokemon_base_exp: '',
        new_pokemon_base_happiness: '',
        new_pokemon_capture_rate: '',
        new_pokemon_abilities: '',
        new_pokemon_habitats: [],
        new_pokemon_egg_groups: []
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
        // stringify arrays
        let typeArr = []
        let eggsArr = []

        this.state.new_pokemon_types.map(type => (
            typeArr.push(type.value)
        ))
        this.state.new_pokemon_egg_groups.map(eggs => (
            eggsArr.push(eggs.value)
        ))

        let customPokemon = {
            name: this.state.new_pokemon_name,
            type: typeArr.join(', '),
            hp: this.state.new_pokemon_hp,
            attack: this.state.new_pokemon_attack,
            defense: this.state.new_pokemon_defense,
            speed: this.state.new_pokemon_speed,
            specialAtk: this.state.new_pokemon_specialAtk,
            specialDef: this.state.new_pokemon_specialDef,
            height: this.state.new_pokemon_height,
            weight: this.state.new_pokemon_weight,
            baseExp: this.state.new_pokemon_base_exp,
            baseHappiness: this.state.new_pokemon_base_happiness,
            captureRate: this.state.new_pokemon_capture_rate,
            abilities: this.state.new_pokemon_abilities,
            habitat: this.state.new_pokemon_habitats.value,
            eggGroups: eggsArr.join(', '),
        }

        localStorage.setItem(this.state.new_pokemon_name, JSON.stringify(customPokemon));

        //reset states
        this.setState({
            showModal: true,
            new_pokemon_name: '',
            new_pokemon_types: [],
            new_pokemon_hp: '',
            new_pokemon_attack: '',
            new_pokemon_defense: '',
            new_pokemon_speed: '',
            new_pokemon_specialAtk: '',
            new_pokemon_specialDef: '',
            new_pokemon_height: '',
            new_pokemon_weight: '',
            new_pokemon_base_exp: '',
            new_pokemon_base_happiness: '',
            new_pokemon_capture_rate: '',
            new_pokemon_abilities: '',
            new_pokemon_habitats: [],
            new_pokemon_egg_groups: []
        })
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

    setPokemonSpeed(e) {
        this.setState({new_pokemon_speed: e});
    }

    setPokemonSpecialAtk(e) {
        this.setState({new_pokemon_specialAtk: e});
    }

    setPokemonSpecialDef(e) {
        this.setState({new_pokemon_specialDef: e});
    }

    setPokemonHeight(e) {
        this.setState({new_pokemon_height: e});
    }

    setPokemonWeight(e) {
        this.setState({new_pokemon_weight: e});
    }

    setPokemonBaseExp(e) {
        this.setState({new_pokemon_base_exp: e});
    }

    setPokemonBaseHappiness(e) {
        this.setState({new_pokemon_base_happiness: e});
    }

    setPokemonCaptureRate(e) {
        this.setState({new_pokemon_capture_rate: e});
    }

    setPokemonAbilities(e) {
        this.setState({new_pokemon_abilities: e});
    }

    setPokemonHabitat = new_pokemon_habitats => {
        this.setState({new_pokemon_habitats});
    }

    setPokemonEggGroups = new_pokemon_egg_groups => {
        this.setState({new_pokemon_egg_groups});
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
                                value={this.state.new_pokemon_speed}
                                onChange={e => this.setPokemonSpeed(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="special attack"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_specialAtk}
                                onChange={e => this.setPokemonSpecialAtk(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="special defense"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_specialDef}
                                onChange={e => this.setPokemonSpecialDef(e.target.value)}
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
                                value={this.state.new_pokemon_height}
                                onChange={e => this.setPokemonHeight(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="weight"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_weight}
                                onChange={e => this.setPokemonWeight(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="base experience"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_base_exp}
                                onChange={e => this.setPokemonBaseExp(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="base happiness"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_base_happiness}
                                onChange={e => this.setPokemonBaseHappiness(e.target.value)}
                            />
                        </Col>
                        <Col lg={true}>
                            <Form.Control
                                className="input-form"
                                placeholder="capture rate"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_capture_rate}
                                onChange={e => this.setPokemonCaptureRate(e.target.value)}
                            />
                            <Form.Control
                                className="input-form"
                                placeholder="abilities"
                                aria-describedby="basic-addon1"
                                value={this.state.new_pokemon_abilities}
                                onChange={e => this.setPokemonAbilities(e.target.value)}
                            />
                            <Select
                                className="input-form"
                                placeholder="select habitat"
                                value={this.state.new_pokemon_habitats}
                                onChange={this.setPokemonHabitat}
                                options={this.state.dropdownHabitats}
                                isSearchable 
                            />
                            <Select
                                className="input-form"
                                placeholder="select egg groups"
                                value={this.state.new_pokemon_egg_groups}
                                onChange={this.setPokemonEggGroups}
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

            <SaveSuccess 
                show = {this.state.showModal}
                onHide = {() => this.setState({ showModal: false })}
            />                
            </div>
        )
    }
}
